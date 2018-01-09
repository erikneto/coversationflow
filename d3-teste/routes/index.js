var express = require('express');
var router = express.Router();
var Conversation = require('watson-developer-cloud/conversation/v1');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ws', function (req, res, next) {
  let resposta = {}
  //let newService = {
  //  username: "9de21fa0-8ab9-4322-bfc5-679e56fb0b95",
  //  password: "aMsssKmHntCq",
  //  version_date: '2017-05-26'
  //};
  let newService = {
    username: "62014b74-131e-442a-b235-14c22acd251d",
    password: "RywG7d3za5fn",
    version_date: '2017-05-26'
  };
  cs = new Conversation(newService);
  //cs.list
  //cs.getDialogNodes({ 'workspace_id': "edb1092d-4820-4628-b45f-a724fbc58c30" }, (err, result) => {
  cs.getDialogNodes({ 'workspace_id': "091558a7-3bbc-4e66-8458-67d9b0896719" }, (err, result) => {
    if (err) {
      console.error("Error on Conversation getWorkspace: %j", err);
    }

    result.dialog_nodes.forEach((e) => {
      console.log(e)
      if (e.dialog_node === 'node_4_1512149929170')
        console.log(e);
      if (e.type === 'standard' && (!e.parent || temPaiValido(e.parent, result.dialog_nodes))) {
        let obj = {};

        resposta[e.dialog_node] = {
          'type': e.parent ? 'table' : 'view',
          'name': e.title ? e.title : e.dialog_node,
          'depends': e.parent ? [e.parent] : [],
          'dependedOnBy': adicionaDepended(result, e.dialog_node),
          'docs': e.dialog_node
        }
      }
    });
    res.status(200).json({ data: resposta, errors: [] });
  });

});


function temPaiValido(pai, nos){
  let retorno = false;
  if (pai === 'node_16_1512134411120')
    console.log(1,retorno)
  nos.forEach( (e) => {
      retorno = retorno || (e.dialog_node === pai && e.type === 'standard')
  });
  if (pai === 'node_16_1512134411120')
    console.log(2,retorno)

  return retorno;

}

function adicionaDepended(result, pai) {
  let retorno = [];

  result.dialog_nodes.forEach((e) => {
    if (e.parent === pai && e.type === 'standard') {
      retorno.push(e.dialog_node)
    }
  });
  return retorno;
}

module.exports = router;
