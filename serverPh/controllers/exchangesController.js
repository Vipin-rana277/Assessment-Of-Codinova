const Exchanges = require("../models/Exchanges");
const axios = require('axios');

class exchangesController {
  async exchangesList(req, res) {
    try {
      const exchangesData = await Exchanges.find({});
      return res.status(200).json(exchangesData);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in fetching the exchangesList" });
    }
  }

  async updateExchangesList(req, res) {
    try {
      const list = await axios({
        method: 'get',
        url: 'https://rest.coinapi.io/v1/exchanges/?apikey=61297EC9-2246-4F02-896E-B69A87728B1B',
      });
      const iconsList = await axios({
        method: 'get',
        url: 'https://rest.coinapi.io/v1/exchanges/icons/32?apikey=61297EC9-2246-4F02-896E-B69A87728B1B',
      });
      const finalData = list?.data?.map(item => {
        const icon = iconsList?.data?.find(ele => ele.exchange_id === item.exchange_id);
        if(icon) {
          return {
            ...item,
            url: icon.url
          }
        } return item
      })
      await Exchanges.insertMany(finalData);   
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: `Error in fetching the exchangesList` });
    }
  }
}

module.exports = new exchangesController();
