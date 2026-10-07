
___TERMS_OF_SERVICE___
By creating or modifying this file you agree to Google Tag Manager's Community
Template Gallery Developer Terms of Service available at
https://developers.google.com/tag-manager/gallery-tos (or such other URL as
Google may provide), as modified from time to time.
___INFO___
{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Consent Mode - Vendor Agnostic Google Template",
  "brand": {
    "id": "brand_dummy",
    "displayName": ""
  },
  "description": "This reference template can be used to set default and updated consent states for Consent Mode in conjunction with appropriate triggers. Please use your CMP\u0027s official template if one is available.",
  "containerContexts": [
    "WEB"
  ]
}
___TEMPLATE_PARAMETERS___
[
  {
    "type": "GROUP",
    "name": "commandGroup",
    "displayName": "Consent Command",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "SELECT",
        "name": "command",
        "displayName": "",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "default",
            "displayValue": "Default Command"
          },
          {
            "value": "update",
            "displayValue": "Update Command"
          }
        ],
        "simpleValueType": true,
        "defaultValue": "default",
        "alwaysInSummary": true,
        "subParams": [],
        "help": ""
      }
    ],
    "help": "Choose which Consent Mode command this instance of the template should fire"
  },
  {
    "type": "GROUP",
    "name": "defaultGroup",
    "displayName": "Default Settings",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "PARAM_TABLE",
        "name": "defaultSettings",
        "displayName": "",
        "paramTableColumns": [
          {
            "param": {
              "type": "TEXT",
              "name": "region",
              "displayName": "Region (leave blank to apply to all regions)",
              "simpleValueType": true
            },
            "isUnique": true
          },
          {
            "param": {
              "type": "SELECT",
              "name": "adStorage",
              "displayName": "ad_storage",
              "macrosInSelect": true,
              "selectItems": [
                {
                  "value": "granted",
                  "displayValue": "Granted"
                },
                {
                  "value": "denied",
                  "displayValue": "Denied"
                },
                {
                  "value": "",
                  "displayValue": "(not set)"
                }
              ],
              "simpleValueType": true,
              "defaultValue": "denied"
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "SELECT",
              "name": "analyticsStorage",
              "displayName": "analytics_storage",
              "macrosInSelect": true,
              "selectItems": [
                {
                  "value": "granted",
                  "displayValue": "Granted"
                },
                {
                  "value": "denied",
                  "displayValue": "Denied"
                },
                {
                  "value": "",
                  "displayValue": "(not set)"
                }
              ],
              "simpleValueType": true,
              "defaultValue": "denied"
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "SELECT",
              "name": "functionalityStorage",
              "displayName": "functionality_storage",
              "macrosInSelect": true,
              "selectItems": [
                {
                  "value": "granted",
                  "displayValue": "Granted"
                },
                {
                  "value": "denied",
                  "displayValue": "Denied"
                },
                {
                  "value": "",
                  "displayValue": "(not set)"
                }
              ],
              "simpleValueType": true,
              "defaultValue": "denied"
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "SELECT",
              "name": "personalizationStorage",
              "displayName": "personalization_storage",
              "macrosInSelect": true,
              "selectItems": [
                {
                  "value": "granted",
                  "displayValue": "Granted"
                },
                {
                  "value": "denied",
                  "displayValue": "Denied"
                },
                {
                  "value": "",
                  "displayValue": "(not set)"
                }
              ],
              "simpleValueType": true,
              "defaultValue": "denied"
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "SELECT",
              "name": "securityStorage",
              "displayName": "security_storage",
              "macrosInSelect": true,
              "selectItems": [
                {
                  "value": "granted",
                  "displayValue": "Granted"
                },
                {
                  "value": "denied",
                  "displayValue": "Denied"
                },
                {
                  "value": "",
                  "displayValue": "(not set)"
                }
              ],
              "simpleValueType": true,
              "defaultValue": "denied"
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "SELECT",
              "name": "adUserData",
              "displayName": "ad_user_data",
              "macrosInSelect": true,
              "selectItems": [
                {
                  "value": "granted",
                  "displayValue": "Granted"
                },
                {
                  "value": "denied",
                  "displayValue": "Denied"
                },
                {
                  "value": "",
                  "displayValue": "(not set)"
                }
              ],
              "simpleValueType": true,
              "defaultValue": "denied"
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "SELECT",
              "name": "adPersonalization",
              "displayName": "ad_personalization",
              "macrosInSelect": true,
              "selectItems": [
                {
                  "value": "granted",
                  "displayValue": "Granted"
                },
                {
                  "value": "denied",
                  "displayValue": "Denied"
                },
                {
                  "value": "",
                  "displayValue": "(not set)"
                }
              ],
              "simpleValueType": true,
              "defaultValue": "denied"
            },
            "isUnique": false
          },
          {
            "param": {
              "type": "CHECKBOX",
              "name": "limitSpi",
              "checkboxText": "limit_spi",
              "simpleValueType": true,
              "defaultValue": true
            },
            "isUnique": false
          }
        ],
        "valueValidators": [
          {
            "type": "TABLE_ROW_COUNT",
            "args": [
              1
            ]
          }
        ]
      },
      {
        "type": "LABEL",
        "name": "defaultLabel",
        "displayName": "IMPORTANT: This tag should be fired using the Consent Initialization trigger to ensure default consent settings are in place before any tags fire. Make sure you have configured a separate instance of this template which uses the \"Update\" command. Failure to properly configure both tags will result in undesirable tag behavior."
      },
      {
        "type": "GROUP",
        "name": "settingsGroup",
        "displayName": "Additional Settings",
        "groupStyle": "ZIPPY_OPEN",
        "subParams": [
          {
            "type": "CHECKBOX",
            "name": "adsDataRedaction",
            "checkboxText": "Redact Ads Data",
            "simpleValueType": true
          },
          {
            "type": "TEXT",
            "name": "waitForUpdate",
            "displayName": "Wait For Update",
            "simpleValueType": true,
            "valueUnit": "ms",
            "help": "Time to wait for update command before firing consent-aware tags",
            "defaultValue": 500
          }
        ]
      }
    ],
    "enablingConditions": [
      {
        "paramName": "command",
        "paramValue": "default",
        "type": "EQUALS"
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "updateGroup",
    "displayName": "Update Settings",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "LABEL",
        "name": "updateLabel",
        "displayName": "This tag should be fired on a trigger that executes when consent changes. This template will read the 'qoria_cookie_preferences' cookie to determine consent states. IMPORTANT: Make sure you have configured a separate tag which uses the \"Default\" command. Failure to properly configure both tags will result in undesirable tag behavior."
      }
    ],
    "enablingConditions": [
      {
        "paramName": "command",
        "paramValue": "update",
        "type": "EQUALS"
      }
    ],
    "help": "This tag should be fired on a trigger that executes when consent changes. This template will read the 'qoria_cookie_preferences' cookie to determine consent states. IMPORTANT: Make sure you have configured a separate tag which uses the \"Default\" command. Failure to properly configure both tags will result in undesirable tag behavior."
  }
]
___SANDBOXED_JS_FOR_WEB_TEMPLATE___
const setDefaultConsentState = require('setDefaultConsentState');
const updateConsentState = require('updateConsentState');
const gtagSet = require('gtagSet');
const getCookieValues = require('getCookieValues');
const JSON = require('JSON');
const createQueue = require('createQueue');
const dataLayerPush = createQueue('dataLayer');
const splitInput = (input) => {
  return input.split(',')
    .map(entry => entry.trim())
    .filter(entry => entry.length !== 0);
};
const parseCookie = function (input) {
    const defaultCookieValue = {
        analytics: false,
        advertisement: false,
        functional: false,
        limitSensitiveInfo: true,
    };
    try {
        const parsedCookieValue = JSON.parse(input);
        return typeof parsedCookieValue === 'object' && parsedCookieValue !== null
            ? { ...defaultCookieValue, ...parsedCookieValue }
            : defaultCookieValue;
    } catch (e) {
        return defaultCookieValue;
    }
};

const getConsentValue = function (cookieBooleanValue) {
    return cookieBooleanValue ? 'granted' : 'denied';
};
const parseDefaultCommandData = (settings) => {
  const regions = splitInput(settings.region);
  const commandData = {};
  
  if (regions.length > 0) {
    commandData.region = regions;
  }
  if(settings.adStorage === 'granted' || settings.adStorage === 'denied') {
    commandData.ad_storage = settings.adStorage;
  }
  if(settings.analyticsStorage === 'granted' || settings.analyticsStorage === 'denied') {
    commandData.analytics_storage = settings.analyticsStorage;
  }
  if(settings.functionalityStorage === 'granted' || settings.functionalityStorage === 'denied') {
    commandData.functionality_storage = settings.functionalityStorage;
  }
  if(settings.personalizationStorage === 'granted' || settings.personalizationStorage === 'denied') {
    commandData.personalization_storage = settings.personalizationStorage;
  }
  if(settings.securityStorage === 'granted' || settings.securityStorage === 'denied') {
    commandData.security_storage = settings.securityStorage;
  }
  if(settings.adUserData === 'granted' || settings.adUserData === 'denied') {
    commandData.ad_user_data = settings.adUserData;
  }
  if(settings.adPersonalization === 'granted' || settings.adPersonalization === 'denied') {
    commandData.ad_personalization = settings.adPersonalization;
  }
  return commandData;
};
const processData = () => {
  if (data.command === 'default') {
    data.defaultSettings.forEach(settings => {
      const commandData = parseDefaultCommandData(settings);
      if(data.waitForUpdate > 0) {
        commandData.wait_for_update = data.waitForUpdate;
      }
      setDefaultConsentState(commandData);
      // Push limit_spi to dataLayer
      dataLayerPush({'limit_spi': settings.limitSpi});
    });
    gtagSet('ads_data_redaction', data.adsDataRedaction);
  }
  if (data.command === 'update') {
    // Read qoria_cookie_preferences and update consent
    const savedPreferences = getCookieValues('qoria_cookie_preferences')[0];
    let updatedConsent = {};
    let limitSpiValue = true; // Default if no cookie or value not found

    if (savedPreferences) {
        const parsedPrefs = parseCookie(savedPreferences);

        updatedConsent = {
            analytics_storage: getConsentValue(parsedPrefs.analytics),
            ad_storage: getConsentValue(parsedPrefs.advertisement),
            ad_user_data: getConsentValue(parsedPrefs.advertisement),
            ad_personalization: getConsentValue(parsedPrefs.advertisement),
            personalization_storage: getConsentValue(parsedPrefs.functional),
            functionality_storage: getConsentValue(parsedPrefs.functional),
            security_storage: 'granted', // Always granted
        };
        limitSpiValue = parsedPrefs.limitSensitiveInfo;
    } else {
        // If no cookie, default to denied for all relevant consent types
        updatedConsent = {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            personalization_storage: 'denied',
            functionality_storage: 'denied',
            security_storage: 'granted',
        };
        limitSpiValue = true; // Default if no cookie
    }
    updateConsentState(updatedConsent);
    dataLayerPush({'limit_spi': limitSpiValue});
  }
};
processData();
data.gtmOnSuccess();
___WEB_PERMISSIONS___
[
  {
    "instance": {
      "key": {
        "publicId": "access_consent",
        "versionId": "1"
      },
      "param": [
        {
          "key": "consentTypes",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "analytics_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "wait_for_update"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "functionality_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "personalization_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "security_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_user_data"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_personalization"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "write_data_layer",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keyPatterns",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "ads_data_redaction"
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "read_cookies",
        "versionId": "1"
      },
      "param": [
        {
          "key": "name",
          "value": {
            "type": 1,
            "string": "qoria_cookie_preferences"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "write_data_layer",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keyPatterns",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "limit_spi"
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "logging",
        "versionId": "1"
      },
      "param": [
        {
          "key": "environments",
          "value": {
            "type": 1,
            "string": "debug"
          }
        }
      ]
    },
    "isRequired": true
  }
]
___TESTS___
scenarios:
- name: Defaults set correctly - Global Granted
  code: "const mockData = {\n  command: 'default',\n  defaultSettings: [\n    {\n\
    \      'region':'',\n      'adStorage':'granted',\n      'analyticsStorage':'granted',\n\
    \      'functionalityStorage':'granted',\n      'personalizationStorage':'granted',\n\
    \      'securityStorage':'granted',\n      'adUserData':'granted',\n      'adPersonalization':'granted',\n\
    \    }\n  ],  \n};\n\n// Call runCode to run the template's code.\nrunCode(mockData);\n\
    \n// Verify that the tag finished successfully.\nassertApi('gtmOnSuccess').wasCalled();\n\
    assertApi('setDefaultConsentState').wasCalledWith({\n  ad_storage: 'granted',\n\
    \  analytics_storage: 'granted',\n  functionality_storage: 'granted',\n  personalization_storage:\
    \ 'granted',\n  security_storage: 'granted',\n  ad_user_data: 'granted',\n  ad_personalization:\
    \ 'granted',\n});"
- name: Defaults set correctly - Global Denied
  code: "const mockData = {\n  command: 'default',\n  defaultSettings: [\n    {\n\
    \      'region':'',\n      'adStorage':'denied',\n      'analyticsStorage':'denied',\n\
    \      'functionalityStorage':'denied',\n      'personalizationStorage':'denied',\n\
    \      'securityStorage':'denied',\n      'adUserData':'denied',\n      'adPersonalization':'denied',\n\
    \    }\n  ], \n};\n\n// Call runCode to run the template's code.\nrunCode(mockData);\n\
    \n// Verify that the tag finished successfully.\nassertApi('gtmOnSuccess').wasCalled();\n\
    assertApi('setDefaultConsentState').wasCalledWith({\n  ad_storage: 'denied',\n\
    \  analytics_storage: 'denied',\n  functionality_storage: 'denied',\n  personalization_storage:\
    \ 'denied',\n  security_storage: 'denied',\n  ad_user_data: 'denied',\n  ad_personalization:\
    \ 'denied',\n});"
- name: Analytics Storage Default Not Set - Bad Value Provided
  code: "const mockData = {\n  command: 'default',\n  defaultSettings: [\n    {\n\
    \      'region':'',\n      'adStorage':'denied',\n      'analyticsStorage':'badValue',\n\
    \    }\n  ],  \n};\n\n// Call runCode to run the template's code.\nrunCode(mockData);\n\
    \n// Verify that the tag finished successfully.\nassertApi('gtmOnSuccess').wasCalled();\n\
    assertApi('setDefaultConsentState').wasCalledWith({\n  ad_storage: 'denied',\n\
    });"
- name: Updates set correctly - Denied to Granted
  code: |-
    const setDefaultConsentState = require('setDefaultConsentState');
    const mockData = {
      command: 'update',
      adStorageUpdate: 'granted',
      analyticsStorageUpdate: 'granted',
      adUserDataUpdate: 'granted',
      adPersonalizationUpdate: 'granted',
    };
    setDefaultConsentState({
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
    });
    // Call runCode to run the template's code.
    runCode(mockData);
    // Verify that the tag finished successfully.
    assertApi('gtmOnSuccess').wasCalled();
    assertApi('updateConsentState').wasCalledWith({
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
- name: Updates set correctly - Granted to Denied
  code: |-
    const setDefaultConsentState = require('setDefaultConsentState');
    const mockData = {
      command: 'update',
      adStorageUpdate: 'denied',
      analyticsStorageUpdate: 'denied',
      adUserDataUpdate: 'denied',
      adPersonalizationUpdate: 'denied',
    };
    setDefaultConsentState({
      'ad_storage': 'granted',
      'analytics_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
    });
    // Call runCode to run the template's code.
    runCode(mockData);
    // Verify that the tag finished successfully.
    assertApi('gtmOnSuccess').wasCalled();
    assertApi('updateConsentState').wasCalledWith({
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
- name: Wait for update set correctly
  code: |-
    const mockData = {
      command: 'default',
      defaultSettings: [
        {
          'region':'',
          'adStorage':'granted',
          'analyticsStorage':'granted',
          'adUserData': 'granted',
          'adPersonalization': 'granted',
        }
      ],
      'waitForUpdate': 500,
    };
    // Call runCode to run the template's code.
    runCode(mockData);
    // Verify that the tag finished successfully.
    assertApi('gtmOnSuccess').wasCalled();
    assertApi('setDefaultConsentState').wasCalledWith({
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      wait_for_update: 500,
    });
- name: Test ads_data_redaction
  code: "const mockData = {\n  command: 'default',\n  defaultSettings: [\n    {\n\
    \      'region':'',\n      'adStorage':'granted',\n      'analyticsStorage':'granted',\n\
    \      'adUserData':'granted',\n      'adPersonalization':'granted',\n    }\n\
    \  ], \n  'waitForUpdate': 500,\n  'adsDataRedaction': true,\n};\n\n// Call runCode\
    \ to run the template's code.\nrunCode(mockData);\n\n// Verify that the tag finished\
    \ successfully.\nassertApi('gtmOnSuccess').wasCalled();\nassertApi('gtagSet').wasCalledWith('ads_data_redaction',true);"
- name: ad_user_data Default not set - Bad Value
  code: "const mockData = {\n  command: 'default',\n  defaultSettings: [\n    {\n\
    \      'region':'',\n      'adStorage':'denied',\n      'analyticsStorage':'denied',\n\
    \      'adUserData':'dneied',\n      'adPersonalization':'denied',\n    }\n  ],\
    \  \n};\n\n// Call runCode to run the template's code.\nrunCode(mockData);\n\n\
    // Verify that the tag finished successfully.\nassertApi('gtmOnSuccess').wasCalled();\n\
    assertApi('setDefaultConsentState').wasCalledWith({\n  ad_storage: 'denied',\n\
    \  analytics_storage: 'denied',\n  ad_personalization: 'denied',\n});"
- name: ad_personalization Default not set - Bad Value
  code: "const mockData = {\n  command: 'default',\n  defaultSettings: [\n    {\n\
    \      'region':'',\n      'adStorage':'denied',\n      'analyticsStorage':'denied',\n\
    \      'adUserData':'denied',\n      'adPersonalization':'dneied',\n    }\n  ],\
    \  \n};\n\n// Call runCode to run the template's code.\nrunCode(mockData);\n\n\
    // Verify that the tag finished successfully.\nassertApi('gtmOnSuccess').wasCalled();\n\
    assertApi('setDefaultConsentState').wasCalledWith({\n  ad_storage: 'denied',\n\
    \  analytics_storage: 'denied',\n  ad_user_data: 'denied',\n});"
___NOTES___
Created on 5/16/2022, 12:07:08 PM
