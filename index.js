const util = require('util');
const logStream = new require('stream').Writable();
var temp = require('./template')

const author_data = {
    ravindu : {
        name : 'Ravindu Manoj',
        github : 'ravindu01manoj'
    },
    amda : {
        name : 'BlackAmda',
        github : 'blackamda'
    },
    thisal : {
        name : 'Thisal Sanujaya',
        github : 'sanuwaofficial'
    },
    sisula : {
        name : 'Sisula Welgamage',
        github : 'sisula'
    }
}

function get_log(data) {
    let logs = '';
    logStream._write = function(chunk, encoding, done) {
        logs += chunk.toString();
        done();
      };
    var log = function() {
        const args = Array.prototype.slice.call(arguments);
        logStream.write(util.format.apply(this, args) + '\n');
    };
    log(data)
    return logs
}

async function gen({title='',img='',short_desc='',git='',repo='',about='',npm='',authors=[],codes=[],identify_code=''} = {},template='') {
    template = template || temp
    var author_info = ''
    var code_md = ''
    for (const author of authors) {
        var at = author_data[author.name]
        if(at)Object.assign(author,at)
        author_info += '- [' + author.name + '](https://github.com/' + author.github + ') - ' + author.about + '\n'
    }
    for (const code of codes) {
        if(code.title) code_md += '## ' + code.title + '\n\n'
        code_md += '```ts\n' + code.code + '\n```\n'
        if(code.show) {
            if(typeof code.show == 'string')code.show = [code.show]
            code_md += '```ts\n'
            for (const con of code.show) {
                code_md += '//' + con + '\n'
                await eval(`(async ()=>{
                ${identify_code}\n
                ${code.identify_code || ''}\n
                ${code.code}\n
                code_md += get_log(${code.use_stringify ? 'JSON.stringify(' + con + ',null,4)': con}) + '\\n'
            })()`)
                
            }
            code_md += '```\n'
        }
    }
    return template.replace(/--title--/g,title).replace(/--img--/g,img).replace(/--short-desc--/g,short_desc).replace(/--git--/g,git).replace(/--repo--/g,repo).replace(/--about--/g,about).replace(/--npm--/g,npm).replace(/--code--/g,code_md).replace(/--authors--/g,author_info)
}

module.exports = gen