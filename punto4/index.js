const { sendEmail, close } = require('./mailer');

const recipients = ['rdirison@gmail.com','xarteagax@gmail.com']; 
const subject = 'Correo masivo de prueba';
const htmlContent = '<h1>¡Hola!</h1><p>Este es un correo enviado por lotes.</p>';

async function main() {
  const batchSize = 50;

  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    await Promise.all(batch.map(email => sendEmail(email, subject, htmlContent)));
    console.log(`Lote ${i / batchSize + 1} enviado.`);
    await new Promise(res => setTimeout(res, 2000));
  }
}

main().then(() => {
  console.log('Todos los correos fueron enviados.');
  close();
  process.exit(0);
});
