from django.core.management import BaseCommand
from collections import namedtuple
from users.models import User
import csv


class Command(BaseCommand):

    def handle(self, *args, **options):
        initial_users = list()

        with open('users/management/commands/initialUsers.csv', newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter=';')
            header = True
            for row in reader:
                if not row:
                    continue
                if header:
                    Initial_user = namedtuple('InitialUser', row)
                    header = False
                else:
                    initial_users.append(Initial_user._make(row))

        for initial_user in initial_users:
            new_user = User(**initial_user._asdict())
            new_user.set_password(raw_password='init123')
            new_user.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(initial_users)} users'))
