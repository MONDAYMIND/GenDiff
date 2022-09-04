# Вычислитель отличий

### Tests and linter status:
[![Actions Status](https://github.com/MONDAYMIND/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/MONDAYMIND/frontend-project-lvl2/actions)
[![linter-test-check](https://github.com/MONDAYMIND/frontend-project-lvl2/actions/workflows/linter-test-check.yml/badge.svg)](https://github.com/MONDAYMIND/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/2bcaab0ac44b2fb72108/maintainability)](https://codeclimate.com/github/MONDAYMIND/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2bcaab0ac44b2fb72108/test_coverage)](https://codeclimate.com/github/MONDAYMIND/frontend-project-lvl2/test_coverage)

### Описание
"Вычислитель отличий" сравнивает объекты и возвращает обнаруженные в них изменения. Программа работает в нескольких режимах, поддерживает два формата файлов и несколько форматов вывода результата сраванения.

#### Поддерживаемые форматы файлов
- json
- yaml/yml

#### Форматы вывода результата сравнения
- stylish
- plain
- json

#### Режимы работы
- cli-утилита
- js-библиотека

### Установка и запуск cli-утилиты
1. Склонируйте репозиторий и установите зависимости: 
```
make install
```
2. Добавьте исполняемые файлы программы в окружение Linux:
```
npm link
```
3. Запустите программу, передав ей два файла для сравнения и формат вывода результата (по умолчанию 'stylish'):
```
gendiff file1.json file2.yml -f plain
```
4. Получите дополнительную справку:
```
gendiff -h
```

### Установка и запуск js-библиотеки
1. Склонируйте репозиторий и установите все зависимости:
```
make install
```
2. Импортируйте библиотеку в модуль:
```
import genDiff from '@hexlet/code';
```
3. Используйте функцию:
```
genDiff(filepath1, filepath2, format);
```
   Параметры функции:
   - **filepath1**, **filepath2** - абсолютные или относительные пути к файлам
   - \[**format**\] - формат результата сравнения

## Сравнение плоских json-файлов:
[![asciicast](https://asciinema.org/a/491834.svg)](https://asciinema.org/a/491834)

## Сравнение плоских json и yml-файлов):
[![asciicast](https://asciinema.org/a/493013.svg)](https://asciinema.org/a/493013)

## Сравнение вложенных json и yml-файлов с выводом в формате STYLISH:
[![asciicast](https://asciinema.org/a/494347.svg)](https://asciinema.org/a/494347)

## Сравнение вложенных json и yml-файлов с выводом в форматах STYLISH и PLAIN:
[![asciicast](https://asciinema.org/a/494513.svg)](https://asciinema.org/a/494513)

## Сравнение вложенных json и yml-файлов с выводом в форматах JSON, PLAIN и STYLISH:
[![asciicast](https://asciinema.org/a/495122.svg)](https://asciinema.org/a/495122)
