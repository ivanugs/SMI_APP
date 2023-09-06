from django.core.management.base import BaseCommand
from smi_api.scripts.load_database import load_database

class Command(BaseCommand):
    help = 'Load catalogs based on dict'

    def handle(self, *args, **options):
        load_database()
        self.stdout.write(self.style.SUCCESS('Database successfully loaded'))