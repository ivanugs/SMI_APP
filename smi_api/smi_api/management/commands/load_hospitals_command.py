from django.core.management.base import BaseCommand
from smi_api.scripts.load_hospitals import load_hospitals

class Command(BaseCommand):
    help = 'Load hospitals based on a csv file'

    def handle(self, *args, **options):
        load_hospitals()
        self.stdout.write(self.style.SUCCESS('Hospitals successfully loaded'))