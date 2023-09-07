#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN D8
#define RST_PIN D0

#define LONGITUD_BYTES 18
#define LONGITUD_BYTES_ESCRITURA 16

#define MODO_LECTURA 1
#define MODO_ESCRITURA 2
#define MODO_MAC 3
#define MODO MODO_MAC //desde aqui se elige mac, excritura, lectura.

byte nuidPICC[4];

MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;


void setup() {
  Serial.begin(115200);
  while (!Serial) {
    // Esperar serial. Nota: la tarjeta NO HARÁ NADA hasta que haya comunicación Serial (es decir, que el monitor serial sea abierto)
    // si tú no quieres esto, simplemente elimina todas las llamadas a Serial
  }
  // Iniciar lector
  SPI.begin();
  rfid.PCD_Init();
  // Preparar la clave para leer las tarjetas RFID
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
  Serial.println("Iniciado correctamente");
}

//------------------------------------------------------------------LECTURA DE LA TARJETA-------------------------------------------------------
bool readCard(char mensaje[LONGITUD_BYTES]) {
  if (!rfid.PICC_IsNewCardPresent()) {
    return false;
  }
  if (!rfid.PICC_ReadCardSerial()) {
    Serial.println("Error leyendo serial");
    return false;
  }

  byte bloque = 1;  // El bloque que leemos
  byte longitud = LONGITUD_BYTES;
  byte buferLectura[LONGITUD_BYTES];

  MFRC522::StatusCode estado;
  estado = rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloque, &key, &(rfid.uid));
  if (estado != MFRC522::STATUS_OK) {
    Serial.println("Error autenticando");
    Serial.println(rfid.GetStatusCodeName(estado));
    return false;
  }
  estado = rfid.MIFARE_Read(bloque, buferLectura, &longitud);
  if (estado != MFRC522::STATUS_OK) {
    Serial.println("Error leyendo bloque");
    Serial.println(rfid.GetStatusCodeName(estado));
    return false;
  }

  for (uint8_t i = 0; i < LONGITUD_BYTES - 2; i++) {
    mensaje[i] = buferLectura[i];
  }
  // Ya pueden retirar la tarjeta

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  return true;
}

//------------------------------------------------------------------ESCRIBIR EN LA TARJETA-------------------------------------------------------
bool writeCard(char cadena[LONGITUD_BYTES_ESCRITURA]) {
  if (!rfid.PICC_IsNewCardPresent()) {
    return false;
  }
  if (!rfid.PICC_ReadCardSerial()) {
    Serial.println("Error leyendo serial");
    return false;
  }

  byte bloque = 1;
  byte buferEscritura[LONGITUD_BYTES_ESCRITURA];
  // Copiar cadena al búfer
  for (uint8_t i = 0; i < LONGITUD_BYTES_ESCRITURA; i++) {
    buferEscritura[i] = cadena[i];
  }
  MFRC522::StatusCode estado;
  estado = rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloque, &key, &(rfid.uid));
  if (estado != MFRC522::STATUS_OK) {
    Serial.println("Error autenticando");
    Serial.println(rfid.GetStatusCodeName(estado));
    return false;
  }
  estado = rfid.MIFARE_Write(bloque, buferEscritura, LONGITUD_BYTES_ESCRITURA);
  if (estado != MFRC522::STATUS_OK) {
    Serial.println("Error escribiendo bloque");
    Serial.println(rfid.GetStatusCodeName(estado));
    return false;
  }
  // Ya pueden retirar la tarjeta

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  return true;
}

void getMac() {
  if (!rfid.PICC_IsNewCardPresent())
    return;

  if (!rfid.PICC_ReadCardSerial())
    return;

  for (byte i = 0; i < 4; i++) {
    nuidPICC[i] = rfid.uid.uidByte[i];
  }

  printHex(rfid.uid.uidByte, rfid.uid.size);
  Serial.println();
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}

void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? "0" : "");
    Serial.print(buffer[i], HEX);
  }
}

void loop() {
  if (MODO == MODO_LECTURA) {
    char contenidoRfid[LONGITUD_BYTES] = "";
    bool lecturaExitosa = readCard(contenidoRfid);
    if (lecturaExitosa) {
      Serial.println("Lo que hay escrito es:");
      Serial.println(contenidoRfid);
    } else {
      Serial.println("Error leyendo. Tal vez no hay RFID presente");
    }
  } else if (MODO == MODO_ESCRITURA) {
    char mensaje[] = "UID PACIENTE";
    bool escrituraExitosa = writeCard(mensaje);
    if (escrituraExitosa) {
      Serial.println("Escrito ok");
    } else {
      Serial.println("Error escribiendo. Tal vez no hay RFID presente");
    }
  } else if (MODO == MODO_MAC) {
    if (!rfid.PICC_IsNewCardPresent())
      return;

    if (!rfid.PICC_ReadCardSerial())
      return;

    for (byte i = 0; i < 4; i++) {
      nuidPICC[i] = rfid.uid.uidByte[i];
    }

    printHex(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
  delay(1000);
}
