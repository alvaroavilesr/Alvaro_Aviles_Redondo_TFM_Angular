## [Máster en Ingeniería Web por la Universidad Politécnica de Madrid (miw-upm)](http://miw.etsisi.upm.es)
## Trabajo de fin de master 📖
> Este proyecto es uno de los dos proyectos que se han desarrollado para el trabajo de fin de master, el cual consiste en la migración
> de una API rest con arquitectura 3 capas a una arquitectura hexagonal, así como la aplicación del framework de Angular.

### Estado del código ⚙️
[![DevOps](https://github.com/alvaroavilesr/Alvaro_Aviles_Redondo_TFM_Angular/actions/workflows/build.yml/badge.svg)](https://github.com/alvaroavilesr/Alvaro_Aviles_Redondo_TFM_Angular/actions/workflows/build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular&metric=bugs)](https://sonarcloud.io/summary/new_code?id=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=alvaroavilesr_Alvaro_Aviles_Redondo_TFM_Angular)

## Arranque de la aplicación 🚀

Sigue estos pasos para arrancar la aplicación en local:
1. Asegurate de tener instalado:
    - Docker
    - Docker-compose
    - Git
2. Clona este repositorio en tu local.
3. Ejecuta el comando "docker build -f dockerfile -t alvaro_aviles_redondo_tfm_angular ." y después ejecuta "docker run -d -p 4200:4200 --name Angular-container alvaro_aviles_redondo_tfm_angular".
4. Todo está listo para ejecutar la aplicación, que ahora es accesible a través del link http://localhost:4200/

## Acceso a la aplicación 🌐

Una vez realizados los pasos de arranque, la aplicación será accesible. Habrá varios puntos de acceso, pero solo el front-end web será accesible para el usuario final:

- Front-end web: http://localhost:4200/

- SwaggerUI: http://localhost:8082/swagger-ui/index.html

- API Healthcheck: http://localhost:8082/actuator/health

- Panel de control PhpMyAdmin: http://localhost:8081/