create_all_migrations:
	python manage.py makemigrations usuarios    
	python manage.py makemigrations hospitales    
	python manage.py makemigrations pacientes    
	python manage.py makemigrations rutas    
	python manage.py makemigrations servicios    


django_dev_setup:
	pip uninstall -y Django
	rm -rf `find . -type d -name __pycache__`
	rm -rf `find . -type d -name migrations`
	pip install Django
	make create_all_migrations
	python manage.py migrate

django_setup:
	make create_all_migrations
	python manage.py migrate

insert_data:
	make load_all_fixtures
	python manage.py load_database_command

