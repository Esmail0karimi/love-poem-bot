const fs = require("fs");
const zlib = require("zlib");

// خواندن فایل فشرده
const compressed =
fs.readFileSync("poems.json.gz");

const poems =
JSON.parse(
zlib.gunzipSync(compressed)
);

// فایل وضعیت
let state={usedPoems:[]};

if(fs.existsSync("state.json")){
    state=JSON.parse(
        fs.readFileSync(
            "state.json",
            "utf8"
        )
    );
}

let available=
poems.filter(
(_,index)=>
!state.usedPoems.includes(index)
);

// اگر همه استفاده شدند
if(available.length===0){

    state.usedPoems=[];

    available=poems;
}

// انتخاب شعر تصادفی
const poem=
available[
Math.floor(
Math.random()*available.length
)
];

// ذخیره شناسه
const poemIndex=
poems.indexOf(poem);

state.usedPoems.push(
poemIndex
);

// ذخیره state
fs.writeFileSync(
"state.json",
JSON.stringify(
state,
null,
2
)
);

// محدودیت تلگرام
let message=poem;

if(message.length>4096){

message=
message.substring(
0,
4000
)+"...";
}

// ارسال
fetch(
`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

chat_id:
process.env.CHAT_ID,

text:message

})

}
)
.then(
res=>res.json()
)
.then(console.log)
.catch(console.error);
