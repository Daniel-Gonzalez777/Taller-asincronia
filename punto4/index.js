const sendEmail = require('./mailer');

const recipients = [
  'parapelixulascami@gmail.com',
  'xarteagax123@gmail.com',
];

const subject = 'Promoción especial 🚀';
const htmlContent = '<h1>¡Hola!</h1><p>Este es un correo masivo de prueba.</p>';

async function main() {
  const batchSize = 50; 
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    await Promise.all(batch.map(email => sendEmail(email, subject, htmlContent)));
    console.log(`Lote ${i / batchSize + 1} enviado.`);
    await new Promise(res => setTimeout(res, 2000)); 
  }
}

main();
