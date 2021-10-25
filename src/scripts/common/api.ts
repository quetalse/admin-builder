import axios, {AxiosPromise, AxiosResponse} from "axios";
import {agreementsBloc, agreementsSignatories, agreementsTwoSides, agreementsWg, Bloc, Country, Loyalty, Wg} from "../@types/@interfaces";
import {extend} from "jquery";

type InitialData = {
    HOST_URL: string;
};

const initialData = (window as any) as InitialData;
const HOST_URL = initialData.HOST_URL;

const instance = axios.create({
    baseURL: HOST_URL,
    responseType: "json",
    headers: {
        'X-Custom-Header': 'Custom',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
        'Content-Type': "multipart/form-data"
    }
});

const fileUploaderAPI = {
    twosides: '',
    bloc: '',
    wg: ''
}

const select2API = {
    getData: function(route: string){
        return instance.get(`${route}`);
    },
    loyalty: {
       all: HOST_URL + '/api/loyalty/select/',
       byId: HOST_URL + '/api/loyalty/select?id=',                 //////////////

       byCountryId: HOST_URL + '/api/loyalty/select?country_id=',
    },
    countries: {
        all: HOST_URL + '/api/countries/select',
        byId: HOST_URL + '/api/countries/select?id=',              ////////////////

        byBlocId: HOST_URL + '/api/countries/select?bloc_id=',
        byWgId: HOST_URL + '/api/countries/select?wg_id=',
    },
    blocs: {
        all: HOST_URL + '/api/blocs/select',
        byId: HOST_URL + '/api/blocs/select?id=',                  //////////////////

        byWgId: HOST_URL + '/api/blocs/select?wg_id=',
    },
    wg: {
        all: HOST_URL + '/api/wg/select',
        byId: HOST_URL + '/api/wg/select?id=',                     /////////////////

        byBlocId: HOST_URL + '/api/wg/select?bloc_id=',
    }
}

const datatablesAPI = {
    settings: {
        countries: HOST_URL + '/api/datatables/countries/',
        blocs: HOST_URL + '/api/datatables/blocs/',
        wg: HOST_URL + '/api/datatables/wg/',
    },
    classifiers: {
        loyalty: HOST_URL + '/api/datatables/loyalty/'
    },
    agreements: {
        twoSides: HOST_URL + '/api/datatables/agreements?type=twosides',

        blocs: HOST_URL + '/api/datatables/agreements?type=blocs',
        wg: HOST_URL + '/api/datatables/agreements?type=wg',
        signatories: HOST_URL + '/api/datatables/agreements?type=signatories',
    }
}

const autographAPI = {
    //////////////////// LOYALTY ///////////////////////////
    // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#
    getLoyalty: function(loyaltyId: number){
        return instance.get(`/api/loyalty/${loyaltyId}/read`);
    },
    // // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.ffi1e0rntfba
    // addCountry: function (countryData: Country) {
    //     return instance.post('/api/country', countryData);
    // },
    // // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.ufy5efln0y0z
    // editCountry: function (countryId: number, countryData: Country) {
    //     return instance.post(`/api/country/${countryId}`, countryData)
    // },
    // // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.1y9eqs7tkv
    // deleteCountry: function(countryId: number){
    //     return instance.post(`/api/country${countryId}/remove`)
    // },
    // // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#
    // getCountry: function(countryId: number){
    //     return instance.get(`/api/country/${countryId}/read`)
    // },

    settings: {
        countries: {
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.ffi1e0rntfba
            add: function (countryData: Country) {
                return instance.post('/api/countries', countryData);
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.ufy5efln0y0z
            edit: function (countryId: number, countryData: Country) {
                console.log('countryId', countryId)
                return instance.post(`/api/countries/${countryId}`, countryData)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.1y9eqs7tkv
            delete: function(countryId: number){
                return instance.post(`/api/countries/${countryId}/remove`)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#
            get: function(countryId: number){
                return instance.get(`/api/countries/${countryId}/read`)
            },
        },
        blocs: {
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.6wo81vjswd7j
            add: function (blocData: Bloc) {
                return instance.post('/api/blocs', blocData);
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.zp7029i34vc
            edit: function (blocId: number, blocData: Bloc) {
                return instance.post(`/api/blocs/${blocId}`, blocData)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.fsdsahr8x9jy
            delete: function(blocId: number){
                return instance.post(`/api/blocs/${blocId}/remove`)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#
            get: function(blocId: number){
                return instance.get(`/api/blocs/${blocId}/read`)
            }
        },
        wg: {
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.nn7x4oummj40
            add: function (wgData: Wg) {
                return instance.post('/api/wg', wgData);
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.l174x1f6k9dr
            edit: function (wgId: number, wgData: Wg) {
                return instance.post(`/api/wg/${wgId}`, wgData)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#
            delete: function(wgId: number){
                return instance.post(`/api/wg/${wgId}/remove`)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.yms0cotvdsmc
            get: function(wgId: number){
                return instance.get(`/api/wg/${wgId}/read`)
            }
        }
    },
    classifiers: {
        loyalty: {
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.zhqdxhkcxjvy
            add: function (loyaltyData: Loyalty) {
                return instance.post('/api/loyalty', loyaltyData);
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.3s4gffl1jek5
            edit: function (loyaltyId: number, loyaltyData: Country) {
                return instance.post(`/api/loyalty/${loyaltyId}`, loyaltyData)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.z2x0yeqiqbr2
            delete: function(loyaltyId: number){
                return instance.post(`/api/loyalty/${loyaltyId}/remove`)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#
            get: function(loyaltyId: number){
                return instance.get(`/api/loyalty/${loyaltyId}/read`)
            }
        }
    },
    agreements: {
        twoSides: {
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.jvihsvkw4qdh
            add: function (agreementsTwoSidesData: agreementsTwoSides) {
                agreementsTwoSidesData.append('type', 'twoside')
                return instance.post('/api/agreement', agreementsTwoSidesData);
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.bpg62djtr8dj
            edit: function (agreementsTwoSidesId: number, agreementsTwoSidesData: agreementsTwoSides) {
                agreementsTwoSidesData.append('type', 'twoside')
                return instance.post(`/api/agreement/${agreementsTwoSidesId}`, agreementsTwoSidesData)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.fqhxpso8ygkz
            delete: function(agreementsTwoSidesId: number){
                return instance.post(`/api/agreement/${agreementsTwoSidesId}/remove`)
            },
            // https://docs.google.com/document/d/186VtU8Yh56rADhMxOGcIrND8aqj1CNgUh6a4EbTJ7E4/edit#heading=h.n5xll05wo4h3
            get: function(agreementsTwoSidesId: number){
                return instance.get(`/api/agreement/${agreementsTwoSidesId}/read`)
            }
        },
        blocs: {
            add: function (agreementsBlocData: agreementsBloc) {
                agreementsBlocData.append('type', 'bloc')
                return instance.post('/api/agreement', agreementsBlocData);
            },
            edit: function (agreementsBlocId: number, agreementsBlocData: agreementsBloc) {
                agreementsBlocData.append('type', 'bloc')
                return instance.post(`/api/agreement/${agreementsBlocId}`, agreementsBlocData)
            },
            delete: function(agreementsBlocId: number){
                return instance.post(`/api/agreement/${agreementsBlocId}/remove`)
            },
            get: function(agreementsBlocId: number){
                return instance.get(`/api/agreement/${agreementsBlocId}/read`)
            }
        },
        wg: {
            add: function (agreementsWgsData: agreementsWg) {
                agreementsWgsData.append('type', 'wg')
                return instance.post('/api/agreement', agreementsWgsData);
            },
            edit: function (agreementsWgId: number, agreementsWgData: agreementsWg) {
                agreementsWgData.append('type', 'wg')
                return instance.post(`/api/agreement/${agreementsWgId}`, agreementsWgData)
            },
            delete: function(agreementsWgId: number){
                return instance.post(`/api/agreement/${agreementsWgId}/remove`)
            },
            get: function(agreementsWgId: number){
                return instance.get(`/api/agreement/${agreementsWgId}/read`)
            }
        },
        signatories: {
            add: function (agreementsSignatoriesData: agreementsSignatories) {
                agreementsSignatoriesData.append('type', 'signatory')
                return instance.post('/api/agreement', agreementsSignatoriesData);
            },
            edit: function (agreementsSignatoriesId: number, agreementsSignatoriesData: agreementsSignatories) {
                agreementsSignatoriesData.append('type', 'signatory')
                return instance.post(`/api/agreement/${agreementsSignatoriesId}`, agreementsSignatoriesData)
            },
            delete: function(agreementsSignatoriesId: number){
                return instance.post(`/api/agreement/${agreementsSignatoriesId}/remove`)
            },
            get: function(agreementsSignatoriesId: number){
                return instance.get(`/api/agreement/${agreementsSignatoriesId}/read`)
            }
        }
    }
};

export { datatablesAPI, select2API, fileUploaderAPI }

export default autographAPI;
