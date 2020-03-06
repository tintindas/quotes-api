# Quotes API

Fetch quotes by popular (my favourite) authors.

## Object Structure

```
Quote{
  _id: String,         //autogenerated
  text: String,
  author: String,
  source: String
}
```

## Get all quotes

```
/quotes
```

Returns all the quotes in the database.

## Search by author

```
/quotes/author=<AUTHOR'S NAME>
```

Returns all quotes by specified author.

Example:

```
/quotes/author=Neil Gaiman
```

## Search by source

```
quotes/source=<SOURCE>
```

Returns all quotes from specified source.

Example:

```
/quotes/source=Coraline
```

## Limit returned QUERIES

```
/quotes/author=<AUTHOR'S NAME>/<NUMBER OF QUOTES REQUIRED>
```

Get required number of quotes returned by specifying a number after author or source.

Example:

```
/quotes/author=Neil Gaiman/20
```
Returns 20 quotes by Neil Gaiman.

## Random Quote

```
/quotes/random
```

Returns random quote from database.
