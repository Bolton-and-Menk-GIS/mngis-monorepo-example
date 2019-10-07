import axios from 'axios';

export class SunriseAPI{

  constructor(url){
    this.url = url;
  }

  async getSunriseData(params={}){
    params.date = params.date || 'today';
    params.formatted = params.formatted || 0;
    const { data } = await axios.get(this.url, {
      params
    });

    return data.results;
  }
}

const default_tz_params = {
  format: 'json',
  by: 'position'
}

export class TimezoneAPI {
  constructor(url, apiKey){
    this.apiKey = apiKey;
    this.url = url;
  }

  async getTimeZone(params={}){
    params.key = this.apiKey;
    Object.assign(params, default_tz_params);
    const { data } = await axios.get(this.url, { params })
    return data;
  }
}