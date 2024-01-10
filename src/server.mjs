import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import * as Minio from 'minio'

const minioClient = new Minio.Client({
  endPoint: process.env.STORAGE_ENDPOINT,
  useSSL: true,
  accessKey: process.env.STORAGE_AK,
  secretKey: process.env.STORAGE_SK,
  region: process.env.STORAGE_REGION,
})

const fastify = Fastify({ logger: true })
fastify.register(cors)
fastify.register(multipart, {
  limits: {
    fileSize: 32 * 1024 * 1024,
  },
})

fastify.put('/upload', async function (req, reply) {
  const authHeader = req.headers.authorization
  const uploadKey = process.env.UPLOAD_KEY
  if (authHeader !== `Bearer ${uploadKey}`) {
    reply.status(403)
    return { error: 'invalid key' }
  }
  const data = await req.file()
  const key = req.query.path
  const url = process.env.STORAGE_PUBLIC_URL + '/' + key
  const metaData = { 'Content-Type': data.mimetype }
  await minioClient.putObject(
    process.env.STORAGE_BUCKET,
    key,
    data.file,
    metaData,
  )
  return { url }
})

fastify.listen({ port: +process.env.PORT || 10847, host: '0.0.0.0' }, (err) => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
