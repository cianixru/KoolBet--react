export const signUpFieldsList = {
    "ok": true,
    "result": [
      {
        "name": "terms_and_cond_version",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 1,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "1",
        "verified": null
      },
      {
        "name": "test 1",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 2,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "test 4",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 3,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "werqwer2",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 4,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "fb_accessToken",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 11,
        "sessionOpening": true,
        "readonly": true,
        "searchable": false,
        "hidden": true,
        "type": "TOKEN",
        "sequence": 5,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": null,
        "verified": null
      },
      {
        "name": "newToken",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": true,
        "searchable": false,
        "hidden": true,
        "type": "NEW_TOKEN",
        "sequence": 6,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": null,
        "verified": null
      },
      {
        "name": "fb_userID",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 11,
        "sessionOpening": true,
        "readonly": true,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 7,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": null,
        "verified": null
      },
      {
        "name": "loginType",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": true,
        "readonly": true,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 8,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": null,
        "verified": null
      },
      {
        "name": "isAffiliate",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": true,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 9,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "false",
        "verified": null
      },
      {
        "name": "user_registration_verify_email",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": true,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 10,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "false",
        "verified": null
      },
      {
        "name": "username",
        "mandatory": true,
        "mandatorySpecific": true,
        "mandatoryRegistration": 1,
        "sessionOpening": false,
        "readonly": true,
        "searchable": true,
        "hidden": false,
        "type": "STRING",
        "sequence": 11,
        "page": 0,
        "validationRules": {
          "validationRule": [
            {
              "name": "MAX",
              "value": "18"
            },
            {
              "name": "MIN",
              "value": "3"
            }
          ]
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "bet_acceptance_checked",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "NUMBER",
        "sequence": 12,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "0;1",
        "verified": null
      },
      {
        "name": "password",
        "mandatory": true,
        "mandatorySpecific": true,
        "mandatoryRegistration": 1,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": false,
        "type": "PASSWORD",
        "sequence": 13,
        "page": 0,
        "validationRules": {
          "validationRule": [
            {
              "name": "MIN",
              "value": "3"
            },
            {
              "name": "MAX",
              "value": "35"
            }
          ]
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "firstname",
        "mandatory": true,
        "mandatorySpecific": true,
        "mandatoryRegistration": 1,
        "sessionOpening": false,
        "readonly": false,
        "searchable": true,
        "hidden": false,
        "type": "STRING",
        "sequence": 14,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "lastname",
        "mandatory": true,
        "mandatorySpecific": true,
        "mandatoryRegistration": 1,
        "sessionOpening": false,
        "readonly": false,
        "searchable": true,
        "hidden": false,
        "type": "STRING",
        "sequence": 15,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "currency",
        "mandatory": true,
        "mandatorySpecific": true,
        "mandatoryRegistration": 1,
        "sessionOpening": false,
        "readonly": true,
        "searchable": true,
        "hidden": true,
        "type": "CURRENCY",
        "sequence": 16,
        "page": 0,
        "validationRules": {
          "validationRule": [
            {
              "name": "MIN",
              "value": "3"
            },
            {
              "name": "MAX",
              "value": "3"
            }
          ]
        },
        "fieldOptions": {
          "fieldOption": [
            {
              "id": "EUR",
              "value": "Euro"
            },
            {
              "id": "CNY",
              "value": "CNY"
            },
            {
              "id": "CNY",
              "value": "CNY"
            },
            {
              "id": "JPY",
              "value": "JPY"
            },
            {
              "id": "UGX",
              "value": "UGX"
            },
            {
              "id": "RON",
              "value": "RON"
            },
            {
              "id": "TTD",
              "value": "TTD"
            },
            {
              "id": "SHP",
              "value": "SHP"
            },
            {
              "id": "MOP",
              "value": "MOP"
            },
            {
              "id": "BTC",
              "value": "BTC"
            },
            {
              "id": "KGS",
              "value": "KGS"
            },
            {
              "id": "DJF",
              "value": "DJF"
            },
            {
              "id": "BTN",
              "value": "BTN"
            },
            {
              "id": "ZAR",
              "value": "ZAR"
            },
            {
              "id": "NOK",
              "value": "NOK"
            },
            {
              "id": "ILS",
              "value": "ILS"
            },
            {
              "id": "SYP",
              "value": "SYP"
            },
            {
              "id": "HTG",
              "value": "HTG"
            },
            {
              "id": "YER",
              "value": "YER"
            },
            {
              "id": "UYU",
              "value": "UYU"
            },
            {
              "id": "XAU",
              "value": "XAU"
            },
            {
              "id": "BBD",
              "value": "BBD"
            },
            {
              "id": "FKP",
              "value": "FKP"
            },
            {
              "id": "MWK",
              "value": "MWK"
            },
            {
              "id": "IDR",
              "value": "IDR"
            },
            {
              "id": "PGK",
              "value": "PGK"
            },
            {
              "id": "XCD",
              "value": "XCD"
            },
            {
              "id": "RWF",
              "value": "RWF"
            },
            {
              "id": "NGN",
              "value": "NGN"
            },
            {
              "id": "BSD",
              "value": "BSD"
            },
            {
              "id": "TMT",
              "value": "TMT"
            },
            {
              "id": "HRK",
              "value": "HRK"
            },
            {
              "id": "COP",
              "value": "COP"
            },
            {
              "id": "GEL",
              "value": "GEL"
            },
            {
              "id": "DKK",
              "value": "DKK"
            },
            {
              "id": "VUV",
              "value": "VUV"
            },
            {
              "id": "FJD",
              "value": "FJD"
            },
            {
              "id": "MVR",
              "value": "MVR"
            },
            {
              "id": "IMP",
              "value": "IMP"
            },
            {
              "id": "AZN",
              "value": "AZN"
            },
            {
              "id": "MNT",
              "value": "MNT"
            },
            {
              "id": "MGA",
              "value": "MGA"
            },
            {
              "id": "WST",
              "value": "WST"
            },
            {
              "id": "VEF",
              "value": "VEF"
            },
            {
              "id": "KMF",
              "value": "KMF"
            },
            {
              "id": "GNF",
              "value": "GNF"
            },
            {
              "id": "SBD",
              "value": "SBD"
            },
            {
              "id": "BDT",
              "value": "BDT"
            },
            {
              "id": "KWD",
              "value": "KWD"
            },
            {
              "id": "MMK",
              "value": "MMK"
            },
            {
              "id": "TJS",
              "value": "TJS"
            },
            {
              "id": "JOD",
              "value": "JOD"
            },
            {
              "id": "NZD",
              "value": "NZD"
            },
            {
              "id": "PAB",
              "value": "PAB"
            },
            {
              "id": "CVE",
              "value": "CVE"
            },
            {
              "id": "CLP",
              "value": "CLP"
            },
            {
              "id": "MDL",
              "value": "MDL"
            },
            {
              "id": "KES",
              "value": "KES"
            },
            {
              "id": "SRD",
              "value": "SRD"
            },
            {
              "id": "MUR",
              "value": "MUR"
            },
            {
              "id": "LRD",
              "value": "LRD"
            },
            {
              "id": "SAR",
              "value": "SAR"
            },
            {
              "id": "ARS",
              "value": "ARS"
            },
            {
              "id": "EGP",
              "value": "EGP"
            },
            {
              "id": "INR",
              "value": "INR"
            },
            {
              "id": "PYG",
              "value": "PYG"
            },
            {
              "id": "TRY",
              "value": "TRY"
            },
            {
              "id": "CDF",
              "value": "CDF"
            },
            {
              "id": "BMD",
              "value": "BMD"
            },
            {
              "id": "OMR",
              "value": "OMR"
            },
            {
              "id": "CUP",
              "value": "CUP"
            },
            {
              "id": "NIO",
              "value": "NIO"
            },
            {
              "id": "GMD",
              "value": "GMD"
            },
            {
              "id": "UZS",
              "value": "UZS"
            },
            {
              "id": "ZMK",
              "value": "ZMK"
            },
            {
              "id": "GTQ",
              "value": "GTQ"
            },
            {
              "id": "GGP",
              "value": "GGP"
            },
            {
              "id": "NPR",
              "value": "NPR"
            },
            {
              "id": "NAD",
              "value": "NAD"
            },
            {
              "id": "PHP",
              "value": "PHP"
            },
            {
              "id": "HUF",
              "value": "HUF"
            },
            {
              "id": "USD",
              "value": "USD"
            },
            {
              "id": "LAK",
              "value": "LAK"
            },
            {
              "id": "XDR",
              "value": "XDR"
            },
            {
              "id": "SZL",
              "value": "SZL"
            },
            {
              "id": "MTL",
              "value": "MTL"
            },
            {
              "id": "BND",
              "value": "BND"
            },
            {
              "id": "TZS",
              "value": "TZS"
            },
            {
              "id": "SDG",
              "value": "SDG"
            },
            {
              "id": "LSL",
              "value": "LSL"
            },
            {
              "id": "KYD",
              "value": "KYD"
            },
            {
              "id": "LKR",
              "value": "LKR"
            },
            {
              "id": "MKD",
              "value": "MKD"
            },
            {
              "id": "MXN",
              "value": "MXN"
            },
            {
              "id": "CAD",
              "value": "CAD"
            },
            {
              "id": "AUD",
              "value": "AUD"
            },
            {
              "id": "ISK",
              "value": "ISK"
            },
            {
              "id": "LYD",
              "value": "LYD"
            },
            {
              "id": "SLL",
              "value": "SLL"
            },
            {
              "id": "PKR",
              "value": "PKR"
            },
            {
              "id": "ANG",
              "value": "ANG"
            },
            {
              "id": "THB",
              "value": "THB"
            },
            {
              "id": "SCR",
              "value": "SCR"
            },
            {
              "id": "LBP",
              "value": "LBP"
            },
            {
              "id": "AED",
              "value": "AED"
            },
            {
              "id": "GHS",
              "value": "GHS"
            },
            {
              "id": "ERN",
              "value": "ERN"
            },
            {
              "id": "BOB",
              "value": "BOB"
            },
            {
              "id": "ZMW",
              "value": "ZMW"
            },
            {
              "id": "GIP",
              "value": "GIP"
            },
            {
              "id": "QAR",
              "value": "QAR"
            },
            {
              "id": "BHD",
              "value": "BHD"
            },
            {
              "id": "IRR",
              "value": "IRR"
            },
            {
              "id": "BWP",
              "value": "BWP"
            },
            {
              "id": "HNL",
              "value": "HNL"
            },
            {
              "id": "CLF",
              "value": "CLF"
            },
            {
              "id": "ALL",
              "value": "ALL"
            },
            {
              "id": "SEK",
              "value": "SEK"
            },
            {
              "id": "RSD",
              "value": "RSD"
            },
            {
              "id": "MYR",
              "value": "MYR"
            },
            {
              "id": "ETB",
              "value": "ETB"
            },
            {
              "id": "STD",
              "value": "STD"
            },
            {
              "id": "BGN",
              "value": "BGN"
            },
            {
              "id": "DOP",
              "value": "DOP"
            },
            {
              "id": "AMD",
              "value": "AMD"
            },
            {
              "id": "XPF",
              "value": "XPF"
            },
            {
              "id": "JMD",
              "value": "JMD"
            },
            {
              "id": "KRW",
              "value": "KRW"
            },
            {
              "id": "MRO",
              "value": "MRO"
            },
            {
              "id": "JEP",
              "value": "JEP"
            },
            {
              "id": "LVL",
              "value": "LVL"
            },
            {
              "id": "BIF",
              "value": "BIF"
            },
            {
              "id": "CZK",
              "value": "CZK"
            },
            {
              "id": "TND",
              "value": "TND"
            },
            {
              "id": "ZWL",
              "value": "ZWL"
            },
            {
              "id": "VND",
              "value": "VND"
            },
            {
              "id": "PEN",
              "value": "PEN"
            },
            {
              "id": "GBP",
              "value": "GBP"
            },
            {
              "id": "DZD",
              "value": "DZD"
            },
            {
              "id": "MZN",
              "value": "MZN"
            },
            {
              "id": "AWG",
              "value": "AWG"
            },
            {
              "id": "XOF",
              "value": "XOF"
            },
            {
              "id": "CHF",
              "value": "CHF"
            },
            {
              "id": "KZT",
              "value": "KZT"
            },
            {
              "id": "UAH",
              "value": "UAH"
            },
            {
              "id": "RUB",
              "value": "RUB"
            },
            {
              "id": "BZD",
              "value": "BZD"
            },
            {
              "id": "TWD",
              "value": "TWD"
            },
            {
              "id": "BAM",
              "value": "BAM"
            },
            {
              "id": "SGD",
              "value": "SGD"
            },
            {
              "id": "BYR",
              "value": "BYR"
            },
            {
              "id": "MAD",
              "value": "MAD"
            },
            {
              "id": "HKD",
              "value": "HKD"
            },
            {
              "id": "LTL",
              "value": "LTL"
            },
            {
              "id": "XAG",
              "value": "XAG"
            },
            {
              "id": "XAF",
              "value": "XAF"
            },
            {
              "id": "KHR",
              "value": "KHR"
            },
            {
              "id": "GYD",
              "value": "GYD"
            },
            {
              "id": "BRL",
              "value": "BRL"
            },
            {
              "id": "AFN",
              "value": "AFN"
            },
            {
              "id": "SVC",
              "value": "SVC"
            },
            {
              "id": "CRC",
              "value": "CRC"
            },
            {
              "id": "IQD",
              "value": "IQD"
            },
            {
              "id": "PLN",
              "value": "PLN"
            },
            {
              "id": "SOS",
              "value": "SOS"
            },
            {
              "id": "TOP",
              "value": "TOP"
            },
            {
              "id": "AOA",
              "value": "AOA"
            },
            {
              "id": "KPW",
              "value": "KPW"
            }
          ]
        },
        "value": null,
        "defaultValue": "EUR",
        "verified": null
      },
      {
        "name": "date_of_birth",
        "mandatory": true,
        "mandatorySpecific": true,
        "mandatoryRegistration": 1,
        "sessionOpening": false,
        "readonly": false,
        "searchable": true,
        "hidden": false,
        "type": "DATE",
        "sequence": 17,
        "page": 0,
        "validationRules": {
          "validationRule": [
            {
              "name": "MIN",
              "value": "10"
            },
            {
              "name": "MAX",
              "value": "120"
            }
          ]
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "email",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": true,
        "hidden": false,
        "type": "EMAIL",
        "sequence": 18,
        "page": 0,
        "validationRules": {
          "validationRule": [
            {
              "name": "MAX",
              "value": "120"
            },
            {
              "name": "REG_EXP",
              "value": "^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$"
            },
            {
              "name": "MIN",
              "value": "5"
            }
          ]
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "document_type",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": true,
        "searchable": false,
        "hidden": true,
        "type": "DROPDOWN",
        "sequence": 19,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "TERMINAL_FORM_ID_CARD;TERMINAL_FORM_PASSPORT;TERMINAL_FORM_DRIVER_LICENSE",
        "verified": null
      },
      {
        "name": "document_number",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": true,
        "searchable": true,
        "hidden": true,
        "type": "STRING",
        "sequence": 20,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "phone",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": true,
        "hidden": false,
        "type": "PHONE",
        "sequence": 21,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "default_language",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": true,
        "hidden": true,
        "type": "LANGUAGE",
        "sequence": 22,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "EN",
        "verified": null
      },
      {
        "name": "address",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 23,
        "page": 0,
        "validationRules": {
          "validationRule": [
            {
              "name": "MIN",
              "value": "2"
            },
            {
              "name": "MAX",
              "value": "20"
            }
          ]
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "card_pin_enabled",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": true,
        "searchable": false,
        "hidden": true,
        "type": "NUMBER",
        "sequence": 24,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "tax_number",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": true,
        "searchable": true,
        "hidden": true,
        "type": "STRING",
        "sequence": 25,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "0",
        "verified": null
      },
      {
        "name": "test 5",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 26,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "7",
        "verified": null
      },
      {
        "name": "imported",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 27,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "connected_affiliate",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 28,
        "page": 0,
        "validationRules": {
          "validationRule": [
            {
              "name": "MAX",
              "value": "10"
            },
            {
              "name": "MIN",
              "value": "10"
            }
          ]
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "bank_account_number",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 29,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      },
      {
        "name": "bank_name",
        "mandatory": false,
        "mandatorySpecific": false,
        "mandatoryRegistration": 0,
        "sessionOpening": false,
        "readonly": false,
        "searchable": false,
        "hidden": true,
        "type": "STRING",
        "sequence": 30,
        "page": 0,
        "validationRules": {
          "validationRule": []
        },
        "fieldOptions": null,
        "value": null,
        "defaultValue": "",
        "verified": null
      }
    ],
    "errors": []
  }