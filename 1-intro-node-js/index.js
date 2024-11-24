const fs = require('fs');


const textContent = fs.readFileSync('./text.txt', 'utf8'); 

console.log(textContent);


const moreText = `Beyond their nutritional value, avocados are incredibly versatile in the kitchen. They can be used in savory dishes like guacamole, salads, and sandwiches, or blended into smoothies and desserts for their creamy texture. They're also known for being a healthy addition to toast, making the perfect base for a variety of toppings.`;


const textOut = `${textContent}

${moreText}

Date: ${Date.now()} 
`;

fs.writeFileSync('./text.txt', textOut);


