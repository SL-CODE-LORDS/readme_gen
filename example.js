// install all dependencies in your project.. before run

(async function run() {

    const fs = require('fs')
    var gen = require('.')

    const main_code = `var Github_db = require('../githubdb/index')
var config={ github_token: 'ghp_....', user_name:'ravindu01manoj', repo:'test_github_db',is_private_repo:true }
var git = new Github_db(config)
`
    var codes = [
        {code:main_code.replace('../githubdb/index','@sl-code-lords/github-db').replace('ghp_....','token').replace('ravindu01manoj','user_name')},

        {title : 'Config',code:`const config = {
    github_token, // your github token
    user_name, // your github username
    repo, // repo name for github db
    commit_message, // commit massage
    committer_mail, // mail of any github account for commit
    committer_name, // name for committer
    use_template, // if you have template repo use_template : 'username/repo'
    is_private_repo // if true repo will gen as private
}`},

        {title : 'Connecting..',code : 'const is_conn = await git.connect()',show:'is_conn'},

        {title : 'File Model', code: `//init new file
var File = git.File('hello.txt','Init','Files/')
        
// upload file to github
var init = await File.upload_data(Buffer.from('test file upload', 'utf-8'))
        
//delete File From Github
var del = await File.delete_file()`,show : ['init','del']},

         {title : 'String Model',code : `//init new String Model
var session = git.stringModel('session','Init','DB/')

// add new string
var add = await session.update_data('Hello I Am Ravindu Manoj -')

// + add string
var second_add = await session.update_data('@ravindu01manoj')

// replace new string
var third_add = await session.update_data('replacement add',true)

// get data from model
var get_data = await session.get_data()

// delete model
var del = await session.delete_model()`,show:['add','second_add','third_add','get_data','del']},

         {title : 'Array Model',code : `//init new Array Model
var list = git.arrayModel('list','Init','DB/')

// add new array
var add = await list.update_data([1,'mango'])

// + add array
var second_add = await list.update_data(['banana','apple'])

// replace new array
var third_add = await list.update_data(['cat','dog','ant'],true)

// get data from model
var get_data = await list.get_data()

// delete model
var del = await list.delete_model()`,show:['add','second_add','third_add','get_data','del']
         },

         {
            title : 'Object Model',
            code : `//init new Object Model
var item = git.objectModel('item','Init','DB/')

// add new object
var add = await item.update_data({name : 'Ravindu',age:'21'})

// + add object
var second_add = await item.update_data({country : 'sri_lanka',age:22,language : 'sinhala'})

// replace new object
var third_add = await item.update_data({game:'cricket',year: 2023},true)

// get data from model
var get_data = await item.get_data()

// delete model
var del = await item.delete_model()`,
           show:['add','second_add','third_add','get_data','del']}
    ]

    var readme = await gen({
        title : 'Github DataBase',
        img : 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        short_desc : 'github repository database',
        about: 'use github repository as database',
        git : 'SL-CODE-LORDS',
        repo : 'Github-DB',
        npm : 'github-db',
        authors : [{name:'ravindu',about : 'project author'}],
        codes,
        identify_code : main_code
    })
    fs.writeFileSync('./README.md',readme)
})()