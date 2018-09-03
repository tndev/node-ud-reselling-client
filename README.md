# ud-reselling

A module that provides an easy to use promise based interface to communicate with API of [ud-reselling](https://www.ud-reselling.com/)

**WARNING: The API, error handling and the returned results not finalized yet.**


## Installation

    npm install @tndev/ud-reselling-client

## Client

### createClient

```js
const client = await require('@tndev/ud-reselling-client').createClient({
  username: 'YOUR-USERNAME',
  password: 'YOUR-PASSWORD'
})
```

### request(command, params, options)

`request` allows communicate with the API directly, `command` and `params` can be looked up in the API documentation provided by ud reselling.
The purpose of this function is to be able to use commands that are currently not abstracted by this module. 

```js
await client.request(command, params, options)
```

## Contact Handlers

### fields

```js
{
  'contactTitle': 'Herr',
  'contactFirstName': 'Heinz',
  'contactLastName': 'Mustermann',
  'contactOrganization': '',
  'contactStreet': 'Tld-Avenue 2',
  'contactZip': '12345',
  'contactCity': 'Domain-Village',
  'contactState': '',
  'contactCountry': 'DE',
  'contactPhone': '+49.123456789',
  'contactFax': '+49.123456789',
  'contactEmail': 'heinz.mustermann@example.com'
}
```


### add(data)

```js
var id = await client.contact.insert(data)
```

### update(data)

`data` has to contain all fields the updated contact handler should have, fields that are not passed with `data` will be deleted.

```js
var id = await client.contact.update(id, data)
```

### delete(data)

```js
var id = await client.contact.delete(id)
```