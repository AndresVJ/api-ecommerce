const request = require('supertest');
const app = require('../app');
require('../models');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');


// Mock de datos para pruebas
const testData = {
  url: 'https://example.com/image.jpg',
  productId: 1
};

describe('Image Controller', () => {
  // Prueba para la función getAll
  test('GET /images', async () => {
    const response = await request(app).get('/images');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Prueba para la función create
  test('POST /images', async () => {
    // Simulamos la subida de un archivo al servidor
    const uploadedFile = {
      fieldname: 'file',
      originalname: 'test_image.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: '/tmp/',
      filename: 'test_image.jpg',
      path: '/tmp/test_image.jpg',
      size: 1000
    };

    // Simulamos la respuesta de Cloudinary
    const cloudinaryResponse = {
      url: 'https://example.com/image.jpg'
    };

    uploadToCloudinary.mockResolvedValue(cloudinaryResponse);

    // Simulamos la solicitud POST
    const response = await request(app)
      .post('/images')
      .attach('file', uploadedFile.path)
      .field('productId', testData.productId);

    // Verificamos la respuesta
    expect(response.status).toBe(201);
    expect(response.body.url).toBe(cloudinaryResponse.url);
    expect(response.body.productId).toBe(testData.productId);
  });


  test('DELETE /images/:id', async () => {
    // Creamos una imagen para la prueba
    const createdImage = await Image.create(testData);

    // Mock de la función deleteFromCloudinary
    deleteFromCloudinary.mockResolvedValue();

    // Simulamos la solicitud DELETE
    const response = await request(app).delete(`/images/${createdImage.id}`);

    // Verificamos la respuesta
    expect(response.status).toBe(204);

    // Verificamos que la imagen se haya eliminado de Cloudinary
    expect(deleteFromCloudinary).toHaveBeenCalledWith(testData.url);
  });
});
