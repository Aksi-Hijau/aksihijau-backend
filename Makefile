s:
	docker compose up --build

down:
	docker compose down

shell:
	docker exec -it aksihijau-backend-web-1 sh -l

shell-db:
	docker exec -it aksihijau-backend-mysql-1 bash -l