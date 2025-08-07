#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.core.management import execute_from_command_line

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'career_counseling.settings')

    # If no arguments passed, or just 'runserver' without port, add default address and port
    if len(sys.argv) == 1:
        sys.argv += ['runserver', '127.0.0.1:8000']
    elif sys.argv[1] == 'runserver' and len(sys.argv) == 2:
        sys.argv.append('127.0.0.1:8000')

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
    
