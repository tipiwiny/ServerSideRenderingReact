import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import {matchRoutes} from 'react-router-config';
import Routes from './client/Routes';

const app = express();


app.use(express.static('public'));
app.get('*', async (req, res) => {
  const store = createStore()

  const promises = matchRoutes(Routes, req.path).map(({route}) => {
    return route.loadData ? route.loadData(store) : null
  })
  await Promise.all(promises)
  res.send(renderer(req,store));
});

app.listen(3000, () => {
  console.log('Listening on prot 3000');
});
