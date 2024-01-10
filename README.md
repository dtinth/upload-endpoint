# upload-endpoint

A simple server that lets me upload file and puts it in an S3-compatible cloud storage.

## Environment Variables

```
STORAGE_ENDPOINT=
STORAGE_BUCKET=
STORAGE_AK=
STORAGE_SK=
STORAGE_REGION=
STORAGE_PUBLIC_URL=
UPLOAD_KEY=
```

## What it does

This server lets me upload files via `multipart/form-data`:

```sh
curl -X PUT "http://localhost:10847/upload?path=hello.html" -H "Authorization: Bearer $UPLOAD_KEY" -F file=@fixtures
/hello.html
```

The file is saved to an S3-compatible storage, and a URL is returned in JSON format:

```json
{ "url": "https://media.mjth.live/hello.html" }
```
