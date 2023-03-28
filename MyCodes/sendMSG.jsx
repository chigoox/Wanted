

export default async function sendMSG(number, email, htmlMSG, txt, title) {
    const end = 4
    const response = await fetch(`http://172.20.10.${end}:4242/sendSMS`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            number: number,
            email: email,
            txt: txt,
            emailMSG: htmlMSG,
            title: title,


        })
    })
}