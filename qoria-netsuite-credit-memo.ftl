<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">
<pdf>
	<head>
		<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />
		<link name="Roboto" type="font" subtype="truetype" src="https://qoria.com/hubfs/fonts/roboto/Roboto-Regular.ttf" src-bold="https://qoria.com/hubfs/fonts/roboto/Roboto-Bold.ttf" src-italic="https://qoria.com/hubfs/fonts/roboto/Roboto-Italic.ttf" src-bolditalic="https://qoria.com/hubfs/fonts/roboto/Roboto-BoldItalic.ttf" bytes="2" />
      
        <#assign font_quicksand_regular = "https://6607213.app.netsuite.com/core/media/media.nl?id=2237295&c=6607213&h=7RKO5hmu2wViC8ViCujyIg1a2izi7u1YdSgtJPO7ovBgeuZU&_xt=.ttf" />
        <#assign font_quicksand_light = "https://6607213.app.netsuite.com/core/media/media.nl?id=2237296&c=6607213&h=oQSodpBKPMoa8p3wBcLzlUUYdm7nNfxZntKASXN8ug9Gxj7y&_xt=.ttf" />
        <#assign font_quicksand_medium = "https://6607213.app.netsuite.com/core/media/media.nl?id=2237293&c=6607213&h=PcdwlUeiTLUwlY61f--GLWIuvTl6_lZI8I6cc37LZ3mxlQhD&_xt=.ttf" />
        <#assign font_quicksand_semibold = "https://6607213.app.netsuite.com/core/media/media.nl?id=2237297&c=6607213&h=-qhCr8yuJOUh9W40XRoctnTS4S4abzRwqCFsfwC0BcRpoYEB&_xt=.ttf" />
        <#assign font_quicksand_bold = "https://6607213.app.netsuite.com/core/media/media.nl?id=2237294&c=6607213&h=JryU3QoojHJyVunAlpttKLMdV7MANBHsCEJ1IrIa0QrWC1nj&_xt=.ttf" />

      	<link type="font" name="Quicksand" subtype="TrueType" src="${font_quicksand_regular?html}" src-light="${font_quicksand_light?html}"  src-medium="${font_quicksand_medium?html}" src-semibold="${font_quicksand_semibold?html}" src-bold="${font_quicksand_bold?html}" />

		<#if .locale == "zh_CN" >
			<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />
		<#elseif .locale == "zh_TW" />
			<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />
		<#elseif .locale == "ja_JP" />
			<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />
		<#elseif .locale == "ko_KR" />
			<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />
		<#elseif .locale == "th_TH" />
			<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />
		</#if>
      
      
      <!-- Start Date -->
      <#if record.custbody_f5_inv_start_date?has_content>
        <#assign startDate = record.custbody_f5_inv_start_date?string['dd-MMM-yyyy']/>
      <#else />
        <#assign startDate = record.trandate?string['dd-MMM-yyyy']/>
      </#if>
      
      <#if record.custbody_f5_inv_end_date?has_content>
      <#assign endDate = record.custbody_f5_inv_end_date?string['dd-MMM-yyyy']/>
      <#else />
      <#assign endDate = ""/>
        </#if>
      
    <#assign dueDateDay = "" />
      <#if dueDateDay?ends_with("11")>
        <#assign dueDateDay = dueDateDay + "th"/>
        <#elseif dueDateDay?ends_with("12")/>
        <#assign dueDateDay = dueDateDay + "th"/>
        <#elseif dueDateDay?ends_with("13")/>
        <#assign dueDateDay = dueDateDay + "th"/>
        <#elseif dueDateDay?ends_with("1")/>
        <#assign dueDateDay = dueDateDay + "st"/>
        <#elseif dueDateDay?ends_with("2")/>
        <#assign dueDateDay = dueDateDay + "nd"/>
        <#elseif dueDateDay?ends_with("3")/>
        <#assign dueDateDay = dueDateDay + "rd"/>
        <#else/>
        <#assign dueDateDay = dueDateDay + "th"/>
        </#if>
      <#assign tranDateDay = record.trandate?string["d"]/>
      <#if tranDateDay?ends_with("1")>
        <#assign tranDateDay = tranDateDay + "st"/>
        <#elseif tranDateDay?ends_with("2")/>
        <#assign tranDateDay = tranDateDay + "nd"/>
        <#elseif tranDateDay?ends_with("3")/>
        <#assign tranDateDay = tranDateDay + "rd"/>
        <#else/>
        <#assign tranDateDay = tranDateDay + "th"/>
        </#if>

      <!-- translation data -->

      <#if record.custbody_end_user.custentity_q_comms_language == "Spanish" >
        <#assign lang = "es" />
        <#setting locale="es"/>
      <#else/>
        <#assign lang = "en" />
        <#setting locale="en"/>
      </#if>

      <#assign translationData = {
                  	"invoice":{
                      "en": "Credit Note",
                      "es": "Factura"
                  },
                  	"tax_invoice": {
                      "en": "Credit Note",
                      "es": "Factura"
                  },
               		"number": {
                      "en": "Credit note number",
                      "es": "N<sup>o</sup> factura"
               },
               "date": {
                      "en": "Invoice Date",
                      "es": "Factura Fecha"
               },
                  "date":{
                      "en": "Date",
                      "es": "Fecha"
                  },
               "end_user": {
                      "en": "End User",
                      "es": "Usuario final"
                  },
                  "spain":{
                      "en": "Spain",
                      "es": "España"
                  },
                  "formatted_date":{
                      "en": "${tranDateDay} ${record.trandate?string['MMMM yyyy']}",
                      "es": "${record.trandate?string['d MMMM yyyy']}"
                  },
                  "invoice_due_date":{
                      "en": "Invoice Due Date",
                      "es": "Fecha vencimiento"
                  },
                  "formatted_due_date":{
                      "en": "${dueDateDay} ${record.trandate?string['MMMM yyyy']}",
                      "es": "${record.trandate?string['d MMMM yyyy']}"
                  },
                  "issued_by":{
                      "en": "Issued by",
                      "es": "Emitido por"
                  },
                   "issued_to":{
                       "en": "Issued to",
                       "es": "Factura al cliente"
                   },
                   "details":{
                       "en": "Details",
                       "es": "Detalles"
                   },
                   "cycle_details":{
                       "en": "This invoice has been issued for the supply of services to <b>${record.custbody_end_user.companyname}</b>",
                       "es": "Esta factura se ha emitido por la prestación de servicios a <b>${record.custbody_end_user.companyname}</b>"
                   },
                   "cycle_details_period":{
               			"en": " for the period starting <b>${startDate}</b> and ending on <b>${endDate}</b>",
                       	"es": " durante el periodo comprendido entre el <b>${startDate}</b> y el <b>${endDate}</b>"
                   },
                   "special_conditions_true":{
               			"en": "The invoice will be issued as per the Special Conditions outlined below.",
                       	"es": "The invoice will be issued as per the Special Conditions outlined below. (To be translated)"
                   },
                   "special_conditions":{
               			"en": "Special Conditions",
                       	"es": "Condiciones especiales"
                   },
                   "invoice_cycle_start":{
               			"en": "Invoices will be issued",
                       	"es": "Las facturas se emitirán"
                   },
                   "invoice_cycle_end":{
               			"en": "for the duration of the contract.",
                       	"es": "durante la vigencia del contrato."
                   },
                   "purchase_order_number":{
               			"en": "Purchase Order/Authorisation",
                       	"es": "Orden de compra/Autorización"
                   },
                   "quantity":{
               			"en": "Qty",
                       	"es": "Unidades"
                   },
                   "tax":{
               			"en": "Tax",
                       	"es": "Unidades"
                   },
                   "item":{
               			"en": "Item",
                       	"es": "Descripción"
                   },
                   "billing":{
               			"en": "Billing",
                       	"es": "Facturación"
                   },
                   "item_rate":{
               			"en": "Item rate",
                       	"es": "Precio"
                   },
                   "special_payment_terms":{
               			"en": "Special payment terms",
                       	"es": "Special payment terms"
                   },
                   "credit_note_issued":{
               			"en": "Credit Note issued for the supply of services to",
                       	"es": "Credit Note issued for the supply of services to"
                   },
                   "purchase_order_number":{
               			"en": "Issued under Purchase Order number",
                    "es": "Issued under Purchase Order number"
                   },
                   "created_from":{
               			"en": "Created from",
                    "es": "Created from"
                   },
                   "total":{
               			"en": "Total",
                       	"es": "Total"
                   },
                   "discount":{
               			"en": "Discount",
                       	"es": "Descuento"
                   },
                   "discounts":{
               			"en": "Discounts",
                       	"es": "Descuentos"
                   },
                   "subtotal_after_discounts":{
               			"en": "Subtotal after discounts",
                       	"es": "Base imponible después de descuentos"
                   },
                   "each":{
               			"en": "Each",
                       	"es": "Cada"
                   },
                   "upfront":{
               			"en": "Upfront",
                       	"es": "Por adelantado"
                   },
                   "annual":{
               			"en": "Annual",
                       	"es": "Anual"
                   },
                   "annually":{
               			"en": "Annually",
                       	"es": "Anualmente"
                   },
                   "monthly":{
               			"en": "Monthly",
                       	"es": "Mensual"
                   },
                   "quarterly":{
               			"en": "Quarterly",
                       	"es": "Trimestral"
                   },
                   "six_monthly":{
               			"en": "6 Monthly",
                       	"es": "6 Mensual"
                   },
               "remittance_advice_email": {
               			"en": "Email remittance advice to",
                       	"es": "Enviar aviso de pago por correo electrónico a"
                 },
               "bank": {
               			"en": "Bank",
                       	"es": "Banco"
                 },
               "account_holder_name": {
               			"en": "Account holder name",
                       	"es": "Titular de la cuenta"
                 },
               "account_number": {
               			"en": "Account number",
                       	"es": "Número de cuenta"
                 },
               "payment_description": {
               			"en": "${subsidiary.custrecord_q_payment_description}",
                       	"es": "Los pagos deben efectuarse a la cuenta que figura a continuación."
                 },
                 "reference": {
                          "en": "Reference",
                          "es": "Referencia"
                 }
               }/>
                      

      <!-- end translation data -->


		<macrolist>
          <macro id="nlheader">
            <table width="100%">
              <tr>
                <td style="padding: 0 42px;">
                  <table class="header" style="width: 100%">
                    <tr>
                      <td style="width: 50%; padding: 0;" align="left">
                        <h1 class="file-type-header text-primary">
                          <#if subsidiary.country = "United States">${translationData.invoice[lang]}
                            <#elseif subsidiary.country == translationData.spain["es"] || subsidiary.country == translationData.spain["en"] />${translationData.invoice[lang]}
                            <#else />${translationData.tax_invoice[lang]}</#if>
                        </h1>
                        
                        <p class="title po-details" style="text-align: left;">
                          <b>${translationData.number[lang]}:</b> ${record.tranid}
                          <br /><b>${translationData.date[lang]}:</b> ${translationData.formatted_date[lang]}
                        </p>
                      </td>
                      <td style="width: 50%; padding: 0;" align="right">
                        <#assign logoUrl = "" />
                        <#assign logoWidth = 0 />
                        <#assign brandColour = "" />
                        <#if (subsidiary.id == "2") && (record.custbody_end_user.custentity_f5_cust_type?has_content)>
                          <#if record.custbody_end_user.custentity_f5_cust_type?lower_case == "consumer">
                            <#assign logoUrl = "http://6607213.shop.netsuite.com/core/media/media.nl?id=16412&c=6607213&h=T7q3VmllBrCULHS_sRcyg9lWxnJ15HLVBFB_x3SwgkwBdSML" />
                            <#assign logoWidth = 164 />
                          <#elseif record.custbody_end_user.custentity_f5_cust_type?lower_case == "education" />
                            <#assign logoUrl = "http://6607213.shop.netsuite.com/core/media/media.nl?id=1882834&c=6607213&h=P6gkyeNm5p9JoneFRbyePv051zIoiIdMiK2aT3Po84HXLX0-" />
                            <#assign logoWidth = 134 />
                          </#if>
                        </#if>
                        <#if (subsidiary.id == "25") && (record.custbody_end_user.custentity_f5_cust_type?has_content)>
                          <#if record.custbody_end_user.custentity_f5_cust_type?lower_case == "education">
                            <#assign logoUrl = "https://6607213.app.netsuite.com/core/media/media.nl?id=2262785&c=6607213&h=viSda0ur7yGt0zygqPlv0WVi0O6ZMLgl1no0hULao39JaQpC&fcts=20230905205409&whence=" />
                            <#assign logoWidth = 118 />
                            <#assign brandColour = "#58b78e" />
                          </#if>
                        </#if>
        				<#if logoUrl?has_content>
                        	<img style="margin: 0; width: ${logoWidth}px; height: 35px; padding-bottom: 7px;"  class="header-logo" src="${logoUrl?xhtml}" />
                        <#elseif subsidiary.custrecord_q_coloured_logo?has_content/>
                        	<img style="margin: 0; width: ${subsidiary.custrecord_q_coloured_logo_width}px; height: 35px; padding-bottom: 7px;"  class="header-logo" src="${subsidiary.custrecord_q_coloured_logo}" />
                        <#else />
                          <@filecabinet nstype="image" alt="" style="margin: 0; width: 118px; height: 35px; padding-bottom: 7px;" class="header-logo" src="https://6607213.app.netsuite.com/core/media/media.nl?id=2262785&c=6607213&h=viSda0ur7yGt0zygqPlv0WVi0O6ZMLgl1no0hULao39JaQpC&fcts=20230905205409&whence=" />
                        </#if>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </macro>

          <macro id="nlfooter">
            <table class="footer" style="width: 100%; height: 100%;">
              <tr>
                <td style="padding: 0 42px;" align="center" valign="middle">
                  <p align="center" style="margin-bottom: 5px;">
                    ${subsidiary.legalname}
                  </p>
                  <p align="center">
                    ${subsidiary.mainAddress.addr1}, ${subsidiary.mainAddress.addr2}
                    <br/>
                     ${subsidiary.mainAddress.city} ${subsidiary.mainAddress.state} <span class="vr text-primary">|</span> ${subsidiary.mainAddress.zip} <span class="vr text-primary">|</span> <#if subsidiary.id == "11" >Australia<#else />${subsidiary.mainAddress.country}</#if>
                  </p>
                </td>
              </tr>
            </table>
          </macro>

		</macrolist>

      <#if subsidiary.id == "2">
        <#assign branding = "historical" />
      <#elseif (subsidiary.id == "25") && (record.custbody_end_user.custentity_f5_cust_type?has_content)/>
        <#if record.custbody_end_user.custentity_f5_cust_type?lower_case == "education">
        	<#assign branding = "qoria" />
        <#else/>
          <#if subsidiary.custrecord_q_branding?has_content>
            	<#assign branding = subsidiary.custrecord_q_branding />
            <#else/>
        		<#assign branding = "historical" />
          </#if>
        </#if>
      <#elseif subsidiary.custrecord_q_branding?has_content />
        <#assign branding = subsidiary.custrecord_q_branding />
      </#if>
      <#if branding?has_content>
        <#if branding?lower_case == "historical">
          <#assign fontStack = "Roboto, Verdana, sans-serif"/>
        <#else />
          <#assign fontStack = "Quicksand, Verdana, sans-serif"/>
        </#if>
      <#else />
        <#assign fontStack = "Quicksand, Verdana, sans-serif"/>
      </#if>
		<style type="text/css">
          * {
            <#if .locale == "zh_CN">
            font-family: NotoSans, NotoSansCJKsc, sans-serif;
            <#elseif .locale == "zh_TW" />
            font-family: NotoSans, NotoSansCJKtc, sans-serif;
            <#elseif .locale == "ja_JP" />
            font-family: NotoSans, NotoSansCJKjp, sans-serif;
            <#elseif .locale == "ko_KR" />
            font-family: NotoSans, NotoSansCJKkr, sans-serif;
            <#elseif .locale == "th_TH" />
            font-family: NotoSans, NotoSansThai, sans-serif;
            <#else />
            font-family: ${fontStack?html};
            </#if>
          }

		/* KS Styles */

          p {
            margin-bottom: 10px;
            font-size: 13px;
            line-height: 19px;
            margin-top: 0;
          }

          .text-right {
            text-align: right;
          }

          .contact-details {
            font-size: 13px;
            line-height: 19px;
          }

          table.banner {
            width: 100%;
          }

          h1 {
            font-family: ${fontStack?html};
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 10px;
            margin-top: 0;
          }

          h2 {
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
            margin-bottom: 0px;
            padding-bottom: 0px;
          }

          h4 {
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 19px;
          }

          th, h3 {
            font-family: ${fontStack?html};
            font-style: normal;
            font-weight: bold;
            font-size: 15px;
            line-height: 19px;
          }
          
          table td, table th {
       /*     word-break:break-all; */
          }

          td p {
          text-align: left;
          }

          .section-container {
            padding-top: 0;
            padding-bottom: 0;
          }

          .section-container {
            padding-left: 42px;
          }

          .section-container {
            padding-right: 42px;
          }

          .cell-left {
            padding-left: 12px;
          }

          .cell-right {
            padding-right: 12px;
          }


          .table-details tr td {
            padding: 2px 0;
          }

          h1.file-type-header {
              font-weight: 300;
              font-size: 30px;
              padding-bottom: 20px;
              text-transform: none;
          }

          p.due-date {
            border-bottom-width: 1px;
            border-bottom-style: solid;
            padding-top:5px;
          }


          .quote-details p {
            font-family: ${fontStack?html};
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 19px;
          }

          .quote-details hr {
            width: 75px;
            border: 0;
            background-color: #ffffff;
            margin-left: 0 !important;
            margin-right: 0;
            display: block;
            margin-top: 0.5em;
            margin-bottom: 1em;
          }

          hr.hr {
            width: 40%;
            border: 0;
            background-color: #000000;
            margin-left: 0 !important;
            margin-right: 0;
            display: block;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }

          .row-odd {
            background-color: #f4f4f4;
          }

          .row-tax {
            background-color: #D6D6D6;
          }

          .row-tax td {
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: right;
          }

          .row-totals {
            background-color: #474646;
          }

          .row-totals td {
            padding-top: 10px;
            padding-bottom: 10px;
            color: #ffffff;
            text-align: right;
          }

          .item-name {
            text-align: left !important;
            font-weight: bold;
          }

          .item-description {
            font-size: 10px;
          }

          .dotted-underline {
            border-bottom: 1px dotted #A5A5A5;
            padding-top: 20px;
          }

          .dashed-underline {
            border-bottom: 1px dashed #A5A5A5;
            padding-top: 30px;
          }

          .str {
            text-decoration: line-through;
          }

          .text-grey {
            color: alpha(50%, #000000) ;
          }
          
          .text-white {
            color: #ffffff;
          }

          .border-bottom {
            border-bottom-style: solid;
            border-bottom-width: 1px;
          }

          .text-center {
            text-align: center;
          }

          .footer {
            background-color: #F0F0F0;
            font-size: 8pt;
            height: 100%;
            text-align: center;
          }

          .footer p {
            font-size: 8pt;
            text-align: center;
            line-height: 14pt;
          }

          .vr {
            margin: 0 5px;
              display: inline-block;
          }

          </style>
          <!--  branding styles - Qoria -->
            <style>

            </style>
      
          <#if branding?lower_case == "historical">
            <style>
     /*       .quote-details-container {
              display: block;
              width: 86%;
              margin-bottom: 40px;
              position: relative;
              padding-bottom: 20px;
              padding-right: 20px;
              background-image: url(https://qoria.com/hubfs/GreySquare_200.png);
              background-position: bottom right;
            }

          .quote-details {
            color: #ffffff;
            padding: 20px;
            width: 100%;
          } */
          
            .quote-details-container {
              display: block;
              width: 100%;
              margin-bottom: 40px;
              position: relative;
              padding: 0;
            }
            .quote-details {
              width: 100%;
              padding: 0;
            }</style>

          <#else />
            <style>
            .quote-details-container {
              display: block;
              width: 100%;
              margin-bottom: 40px;
              position: relative;
              padding: 0;
            }
            .quote-details {
              width: 100%;
              padding: 0;
            }</style>
          </#if>
      
      		<#if brandColour == "">
              <#if subsidiary.custrecord_q_colour_hex_code?has_content>
              	<#assign brandColour = subsidiary.custrecord_q_colour_hex_code?html />
              </#if>
            </#if>
      
      		<#if brandColour == "">
              	<#assign brandColour = "#58b78e" />
            </#if>
            
            <style>
              .text-primary {
                color: ${brandColour};
              }

              .bg-primary {
                background-color: ${brandColour};
              }

              p.due-date {
                border-bottom-color: ${brandColour};
              }

              .border-bottom {
                border-bottom-color: ${brandColour};
              }
            </style>

          <#if record.item?has_content>

			<!-- INITIALISE ALL THE THINGS -->

            <#assign  specialConditions = ""
                      entityName = ""
                      totalDiscounts = 0
                      discountItems = []
                      items = []/>

            <#if record.entity.companyname?has_content>
              <#assign entityName = record.entity.companyname />
            <#else/>
              <#assign entityName = record.entity.firstname + " " + record.entity.lastname />
            </#if>

			<#assign specialConditions = record.custbody_f5_special_payment_terms />

			<!-- SORT RECURRING FROM ONE-OFFS -->

			<#list record.item as item>

			<!-- INITIALISE ITEM DATA -->

              <#assign  discount = ""
                      discountUnitPrice = ""
                      discountType = ""
                      discountPercentage = ""
                      discountAmount = ""
                      discountClass = ""
                      itemRate = ""
                      itemOrdered = 0
                     initItemRate = "" />

              <#assign currentContractPricing = item.custcol_f5_termcontractpricingtype />

                  <!-- Get item rate -->
                    <#if item.custcol_f5_itemrate?has_content>
                      <#assign initItemRate = item.custcol_f5_itemrate/>
                    <#else />
                      <#assign initItemRate = item.rate/>
                    </#if>

                    <#if record.custbody_ps_invoice_cycle == "Monthly">
                      <#assign itemRate = initItemRate/12/>
                    <#elseif record.custbody_ps_invoice_cycle == "Quarterly" />
                      <#assign itemRate = initItemRate/4/>
                    <#elseif record.custbody_ps_invoice_cycle == "6 Monthly" />
                      <#assign itemRate = initItemRate/2/>
                    <#else />
                      <#assign itemRate = initItemRate/>
                    </#if>

            <!-- get qty -->
              <#if item.quantityordered?has_content>
                <#assign initItemQty = item.quantityordered/>
              <#else/>
                <#assign initItemQty = item.quantity/>
              </#if>

              <#assign isDiscount = false/>
              <!-- check for negative quantity invoiced -->
              <#if item.quantity?has_content && item.quantityordered?has_content>
                <#if item.quantity lt 0>
              		<#assign isDiscount = true/>
                </#if>
              </#if>

                <#assign currencyType = '$' />
                <#if record.currencysymbol = 'GBP'>
                  <#assign currencyType = '£'/>
                </#if>

                <#if record.currencysymbol = 'EUR'>
                  <#assign currencyType = '€'/>
                </#if>

				<!-- CALCULATE DISCOUNT AND NEW PRICE -->

                  <#if item.custcol_f5_discountamount?has_content>
                    <#assign discount = item.custcol_f5_discountamount/>
                    <#if discount?string?contains("%")>
                      <#assign discountType = "percentage"/>
                    <#elseif discount?string?replace("[^0-9]", "", "r") != ""/>
                      <#assign discountType = "amount"/>
                    </#if>
                    <#if discountType == "percentage">
                      <#assign discountPercentage = discount?string?replace("%", "")?number
                               discountClass = "str text-grey"
                               />
                      <#assign discountUnitPrice = ((itemRate/100)*(100-discountPercentage))/>
                    <#elseif discountType == "amount" />
                      <#assign discountClass = "str text-grey"/>
                      <#if record.custbody_ps_invoice_cycle == "Monthly">
                        <#assign discountAmount = (discount?string?replace("[^0-9\x2E]", "", "r")?number/12) />
                      <#elseif record.custbody_ps_invoice_cycle == "Quarterly" />
                        <#assign discountAmount = (discount?string?replace("[^0-9\x2E]", "", "r")?number/4) />
                      <#elseif record.custbody_ps_invoice_cycle == "6 Monthly" />
                        <#assign discountAmount = (discount?string?replace("[^0-9\x2E]", "", "r")?number/2) />
                      <#else />
                        <#assign discountAmount = (discount?string?replace("[^0-9\x2E]", "", "r")?number) />
                      </#if>
                      <#assign discountUnitPrice = (itemRate-discountAmount) />
                    </#if>
                  </#if>

                  <#setting number_format="computer" />
                    <#if initItemQty?has_content>
                      <#assign itemOrderedString = (initItemQty)?string/>
                      <#if itemOrderedString != "">
                        <#assign itemOrdered = itemOrderedString?number/>
                      </#if>
                    </#if>
                  <#setting number_format="number" />

                  <#if discountType != "">
                    <#assign itemTotal = discountUnitPrice*itemOrdered/>
                  <#else/>
                    <#assign itemTotal = itemRate*itemOrdered/>
                  </#if>

                  <#if isDiscount == true>
                    <!-- list the discounts -->
                    <#assign items = items + [{"item":item.item,"custcol_f5_item_display_name":item.custcol_f5_item_display_name,"description":item.description,"quantityordered":itemOrdered, "custcol_f5_termcontractpricingtype": item.custcol_f5_termcontractpricingtype,"custcol_swe_contract_item_term_months":item.custcol_swe_contract_item_term_months,"custcol_f5_itemrate":itemRate,"rate":item.rate,"custcol_inline_discount":item.custcol_inline_discount,"amount":item.custcol_f5_pricingtypeamount,"custcol_f5_discountamount":item.custcol_f5_discountamount,"discountType":discountType,"discountClass":discountClass,"discountAmount":discountAmount,"discountPercentage":discountPercentage,"discountUnitPrice":discountUnitPrice,"total":itemTotal,"isDiscount":isDiscount}] />
                    <#assign totalDiscounts = totalDiscounts + itemTotal />
                  <#else />
                    <!-- list non-discounts -->
                    <#assign items = items + [{"item":item.item,"custcol_f5_item_display_name":item.custcol_f5_item_display_name,"description":item.description,"quantityordered":itemOrdered, "custcol_f5_termcontractpricingtype": item.custcol_f5_termcontractpricingtype,"custcol_swe_contract_item_term_months":item.custcol_swe_contract_item_term_months,"custcol_f5_itemrate":itemRate,"rate":item.rate,"custcol_inline_discount":item.custcol_inline_discount,"amount":item.custcol_f5_pricingtypeamount,"custcol_f5_discountamount":item.custcol_f5_discountamount,"discountType":discountType,"discountClass":discountClass,"discountAmount":discountAmount,"discountPercentage":discountPercentage,"discountUnitPrice":discountUnitPrice,"total":itemTotal,"isDiscount":isDiscount}] />
                 </#if>
			</#list>
		</#if>
	</head>
	<body header="nlheader" header-height="100pt" footer="nlfooter" footer-height="70pt" padding="42px 0px 0px 0px" size="A4" align="left" text-align="left">
		<table width="100%">
			<tr>
				<td style="padding: 0 42px;">
					<table width="100%" class="contact-details">
						<tr>
							<td align="right" style="padding:0;">
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table width="100%" style="margin-top: 20px;">
			<tr>
				<td style="padding: 0 42px;" align="left">
                  <div class='quote-details-container <#if branding?lower_case != "historical"></#if>' background-image-dpi="140">
					<div class='quote-details  <#if branding?lower_case == "historical"></#if>'>
                      <table width="100%">
                        <tr>
                          <td valign="top" style="border-right: 1px solid #ebebeb; padding-right: 16px;">
                            <p><b>${translationData.issued_to[lang]}</b><br />
                            ${record.entity.address}</p>
                          </td>
                          <td valign="top" style="padding-left: 16px; min-height: 80px;">
                            <p>
                            <b>${translationData.issued_by[lang]}</b><br />
                            ${subsidiary.legalname} <br />
                            <b>E:</b> ${subsidiary.custrecord_ss_anz_sub_email}<br/>
                            
                            <#if subsidiary.country == "Australia"><b>ABN:</b> ${subsidiary.federalidnumber}</#if>
                            <#if subsidiary.country == "New Zealand"><b>NZBN:</b> ${subsidiary.federalidnumber}</#if>
                            <#if subsidiary.country == "United Kingdom"><b>VAT Number:</b> ${subsidiary.federalidnumber}<br/></#if>
                            <#if subsidiary.country == "United Kingdom"><b>${subsidiary.custrecord_emea_company_reg_num@label}:</b> ${subsidiary.custrecord_emea_company_reg_num}</#if>
                            <#if subsidiary.country == translationData.spain["es"] || subsidiary.country == translationData.spain["en"] ><b>CIF/NIF:</b> ${subsidiary.federalidnumber}</#if>
                            <#if subsidiary.country == "Canada">
                              <b>GST/HST:</b> ${subsidiary.federalidnumber}
                              <#if record.custbody_end_user.taxitem == "CA-S-BC"><br/><b>PST:</b> BC PST Number TBC</#if>
                              <#if record.custbody_end_user.taxitem == "CA-S-SK"><br/><b>PST:</b> SK PST Number TBC</#if>
                              <#if record.custbody_end_user.taxitem == "CA-S-MB"><br/><b>RST:</b> MB RST Number TBC</#if>
                              <#if record.custbody_end_user.taxitem == "CA-S-QC"><br/><b>QST:</b> QC QST Number TBC</#if>
                            </#if>
                            </p>
                          </td>
                        </tr>
                      </table>
					</div>
                  </div>
				</td>
			</tr>
		</table>
		<table width="100%">
          <tr>
            <td class="section-container" style="margin-bottom: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h3>${translationData.details[lang]}</h3>
                    <p>${translationData.credit_note_issued[lang]}: ${record.custbody_end_user.companyname}
                    <#if record.otherrefnum?has_content><br/>${translationData.purchase_order_number[lang]}: ${record.otherrefnum}</#if>
                    <#if record.createdfrom?has_content><br/>${translationData.created_from[lang]}: ${record.createdfrom}</#if>
                    </p>


                    <#if record.custbody_f5_description?has_content>
                    
                      <table width="100%">
                        <tr>
                          <td style="background-color: #f4f4f4; padding: 32px;">
                            <p>
                                <strong>Notes:</strong><br/>
                              ${record.custbody_f5_description}
                            </p>
                          </td>
                        </tr>
                      </table>
                    
                    </#if>

                    <#if subsidiary.custrecord_q_special_note?has_content>
                      <table width="100%">
                        <tr>
                          <td style="background-color: #f4f4f4; padding: 32px;">
                            <p>
                              <#if subsidiary.custrecord_q_special_note_title?has_content>
                                <strong>${subsidiary.custrecord_q_special_note_title}</strong><br/>
                              </#if>
                              ${subsidiary.custrecord_q_special_note}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </#if>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
      </table>

      <#if record.item?has_content>
		<table width="100%">
          <tr>
            <td class="section-container" style="">
              <table width="100%" style="margin-bottom: 40px;">
                <thead align="right" style="overflow-wrap: break-word;">
                  <#assign trbg = "https://6607213.app.netsuite.com/core/media/media.nl?id=2503379&c=6607213&h=hxhYAK-0ar8klqITuGJWWtt7SxAN0QHhEKmy2-bKe6G2KLNH&fcts=20231115234404&whence=" />
                  <tr style="padding: 10px 0 10px 0; <#if branding?lower_case != 'historical'> background-color: #58b78e; background-image: url(${trbg?xhtml}); color: #ffffff; </#if>">
                    <th class="cell-left" style="word-break:break-all" align="left" width="54%">
                      ${translationData.item[lang]}
                    </th>
                    <th align="right" style="word-break:break-all" width="12%">
                      ${translationData.quantity[lang]}
                    </th>
                    <th align="right" style="word-break:break-all" width="12%">
                      ${translationData.item_rate[lang]}
                    </th>
                    <th class="text-right" align="right" width="16%">
                      ${translationData.billing[lang]}
                    </th>
                    <th class="cell-right text-right" style="word-break:break-all" align="right" width="6%">
                      ${translationData.total[lang]}
                    </th>
                  </tr>
                </thead>
                <tbody width="100%">
                  <#list items as item>
                    <#assign rowClass = "row-odd" />
                    <#assign hasDescription = false />
                    <#assign hasDiscount = false />
                    <#assign itemOrdered = 0 />
                    <#assign itemOrderedString = "" />
                    <#if item?is_even_item>
                      <#assign rowClass = "row-even" />
                    </#if>
                    <#if item.description != item.custcol_f5_item_display_name>
                    </#if>
                    <#if item.discountType != "">
                      <#assign hasDiscount = true />
                    </#if>
                    <#if hasDescription == false && hasDiscount == false>
                      <#assign paddingName = "padding: 10px 0;" />
                    <#else />
                      <#assign paddingName = "padding: 10px 0 0 0;" />
                    </#if>
                    <#if hasDiscount == false>
                      <#assign paddingDesc = "padding: 0 0 10px 0;" />
                    <#else />
                      <#assign paddingDesc = "padding: 0 0;" />
                    </#if>
                    <#if hasDescription == false>
                      <#assign paddingDiscount = "padding: 0 0 10px 0;" />
                    <#else />
                      <#assign paddingDiscount = "padding: 0 0;" />
                    </#if>
                    <tr class="${rowClass}" style="${paddingName}" page-break-after="avoid">
                      <td align="left" class="cell-left" text-align="left" style="padding-right: 10px">
                        <strong class="text-primary item-name" letter-spacing="0" text-align="left" align="left">
                          ${item.custcol_f5_item_display_name}
                        </strong>
                      </td>
                      <td align="right">
                        <span class="${item.discountClass}"><#if item.isDiscount == true>-</#if>${item.quantityordered}</span>
                      </td>
                      <td align="right">
                        <span class="${item.discountClass}">
                          ${currencyType}${item.custcol_f5_itemrate?string(",##0.00##")}
                        </span>
                      </td>
                      <td class="text-right" align="right" text-align="right" style="">
                        <span class="${item.discountClass}">
                          <#if item.custcol_f5_termcontractpricingtype == "Actual Item Price">
                            ${translationData.each[lang]}
                          <#elseif record.custbody_ps_invoice_cycle == "Special Conditions" />
                            ${item.custcol_f5_termcontractpricingtype}
                          <#else />
                          <#if record.custbody_ps_invoice_cycle?has_content>


                            <#if record.custbody_ps_invoice_cycle == "Monthly">
                              <#assign invoiceCycle = translationData.monthly[lang] />
                            <#elseif record.custbody_ps_invoice_cycle == "Quarterly" />
                              <#assign invoiceCycle = translationData.quarterly[lang] />
                            <#elseif record.custbody_ps_invoice_cycle == "6 Monthly" />
                              <#assign invoiceCycle = translationData.six_monthly[lang] />
                            <#elseif record.custbody_ps_invoice_cycle == "Annually" />
                              <#assign invoiceCycle = translationData.annually[lang] />
                            <#else />
                              <#assign invoiceCycle = translationData.upfront[lang] />
                            </#if>


                            ${invoiceCycle}
                          </#if>
                          </#if>
                        </span>
                      </td>
                      <td class="cell-right" align="right" style="">
                        <span class="${item.discountClass}"><#if item.isDiscount == true>-</#if>${currencyType}${(item.custcol_f5_itemrate*item.quantityordered)?string(",##0.00##")}</span>
                      </td>
                    </tr>
                    <#if item.discountType != "">
                      <tr class="${rowClass}" style="${paddingDiscount}" page-break-after="avoid">
                        <td align="left" class="cell-left text-left">
                          <#if item.discountType == "percentage">
                            ${translationData.discount[lang]} - ${(item.discountPercentage/100)?string.percent}
                          <#elseif item.discountType == "amount"/>
                            ${translationData.discount[lang]} - ${currencyType}${item.discountAmount?string(",##0.00##")}
                          </#if>
                        </td>
                        <td align="right">
                          ${item.quantityordered}
                        </td>
                        <td align="right">
                          ${currencyType}${item.discountUnitPrice?string(",##0.00##")}
                        </td>
                        <td class="text-right" align="right" text-align="right">
                          <#if item.custcol_f5_termcontractpricingtype == "Actual Item Price">
                            ${translationData.each[lang]}
                          <#elseif record.custbody_ps_invoice_cycle == "Special Conditions" />
                            ${item.custcol_f5_termcontractpricingtype}
                          <#else />
                          <#if record.custbody_ps_invoice_cycle?has_content>
                            ${invoiceCycle}
                          </#if>
                          </#if>
                        </td>
                        <td class="cell-right" align="right" style="">
                          ${currencyType}${(item.discountUnitPrice*item.quantityordered)?string(",##0.00##")}
                        </td>
                      </tr>
                    </#if>
                  </#list>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </#if>

      <table width="100%">
        <tr>
          <td class="section-container" style="">
            <table width="100%">
              <tr>
                <td width="45%" valign="top">
                  <table width="100%" style="width: 100%;" class="table-details">
                    <tr>
                      <td colspan="2" style="padding-top: 10px;">

                        <#if subsidiary.custrecord_q_payment_description?has_content || subsidiary.custrecord_ss_anz_sub_email?has_content>
                          <p>
                          <#if subsidiary.custrecord_q_payment_description?has_content>
                            ${translationData.payment_description[lang]}
                          </#if>
                          <#if subsidiary.custrecord_q_payment_description?has_content && subsidiary.custrecord_ss_anz_sub_email?has_content>
                            <br/>
                          </#if>
                          <#if subsidiary.custrecord_ss_anz_sub_email?has_content>
                            ${translationData.remittance_advice_email[lang]} <strong>${subsidiary.custrecord_ss_anz_sub_email}</strong>.
                          </#if>
                          </p>
                        </#if>
                        <p>
                          <#assign accountNum = ""/>
                          <#assign iban = ""/>
                          <#if subsidiary.id == "17">
                          	<#if record.currencysymbol?lower_case == "aud">
                              <#assign accountNum = "73415761" />
                              <#assign iban = "GB63HBUK40127673415761" />
                          	<#elseif record.currencysymbol?lower_case == "usd" />
                              <#assign accountNum = "71475045" />
                              <#assign iban = "GB92HBUK40127671475045" />
                          	<#elseif record.currencysymbol?lower_case == "eur" />
                              <#assign accountNum = "71475053" />
                              <#assign iban = "GB70HBUK40127671475053" />
                            </#if>
                          </#if>
                          <#if (subsidiary.id == "25") && (record.custbody_end_user.custentity_f5_cust_type?has_content)>
                            <#if record.custbody_end_user.custentity_f5_cust_type?lower_case == "education">
                              <#assign accountNum = "2100-3264-08-1300049305" />
                              <#assign iban = "ES5021003264081300049305" />
                            </#if>
                          </#if>
                          <#if accountNum == "" \and subsidiary.custrecord_q_account_number?has_content>
                            <#assign accountNum = subsidiary.custrecord_q_account_number />
                          </#if>
                          <#if iban == "" \and subsidiary.custrecord_q_iban?has_content>
                            <#assign iban = subsidiary.custrecord_q_iban />
                          </#if>
                          <#if subsidiary.custrecord_q_bank_name?has_content>
                            <strong>${translationData.bank[lang]}:</strong> ${subsidiary.custrecord_q_bank_name}<br/>
                          </#if>
                          <#if subsidiary.custrecord_q_account_holder_name?has_content>
                            <strong>${translationData.account_holder_name[lang]}:</strong> ${subsidiary.custrecord_q_account_holder_name}<br/>
                          </#if>
                          <#if subsidiary.custrecord_q_bsb_number?has_content>
                            <strong>BSB:</strong> ${subsidiary.custrecord_q_bsb_number}<br/>
                          </#if>
                          <#if subsidiary.custrecord_q_sort_code?has_content>
                            <strong>Sort code:</strong> ${subsidiary.custrecord_q_sort_code}<br/>
                          </#if>
                          <#if accountNum?has_content>
                            <strong>${translationData.account_number[lang]}:</strong> ${accountNum}<br/>
                          </#if>
                          <#if iban?has_content>
                            <strong>IBAN:</strong> ${iban}<br/>
                          </#if>
                          <#if subsidiary.custrecord_q_swift_or_bic_code?has_content>
                            <strong>SWIFT/BIC Code:</strong> ${subsidiary.custrecord_q_swift_or_bic_code}<br/>
                          </#if>
                          <#if subsidiary.custrecord_q_aba_number_for_wire?has_content>
                            <strong>ABA Number for Wire Transfer:</strong> ${subsidiary.custrecord_q_aba_number_for_wire}<br/>
                          </#if>
                          <#if subsidiary.custrecord_q_routing_number_for_ach?has_content>
                            <strong>Routing number:</strong> ${subsidiary.custrecord_q_routing_number_for_ach}<br/>
                          </#if>
                          <strong>${translationData.reference[lang]}:</strong> #${record.tranid}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="55%" valign="top">
                  <table width="100%" style="width: 100%;" class="table-details">
                    <tr class="row-totals">
                      <td style="padding: 10px 5px 2px 20px;">
                        ${translationData.discounts[lang]}:</td><td class="text-right" align="right" style="padding: 10px 20px 2px 5px;">${currencyType}${totalDiscounts?string(",##0.00##")}</td>
                    </tr>
                    <tr class="row-totals">
                      <td style="padding: 2px 5px 2px 20px;">${translationData.subtotal_after_discounts[lang]}:</td><td class="text-right" align="right" style="padding: 2px 20px 2px 5px;">${currencyType}${(record.total-record.taxtotal)?string(",##0.00##")}</td>
                    </tr>
                    <#if subsidiary.country != "United States">
                      <tr class="row-totals">
                        <td style="padding: 2px 5px 10px 20px;">
                          <#if subsidiary.country == "Australia">GST:</#if>
                          <#if subsidiary.country == "New Zealand">GST:</#if>
                          <#if subsidiary.country == "United Kingdom">VAT(20%):</#if>
                          <#if subsidiary.country == "Canada">GST/HST:</#if>
                          <#if subsidiary.country == translationData.spain["es"] || subsidiary.country == translationData.spain["en"] >IVA:</#if>
                        </td>
                        <td class="text-right" align="right" style="padding: 2px 20px 10px 5px;">${currencyType}${record.taxtotal?string(",##0.00##")}</td>
                      </tr>
                      </#if>
                    <#if subsidiary.country == "Canada" && record.tax2total?has_content>
                      <tr class="row-totals">
                        <td style="padding: 2px 5px 10px 20px;">
                          PST:
                        </td>
                        <td class="text-right" align="right" style="padding: 2px 20px 10px 5px;">${currencyType}${record.tax2total?string(",##0.00##")}</td>
                      </tr>
                      </#if>
                    <tr class="row-tax">
                      <td style="padding: 10px; padding-right: 5px; padding-left: 20px;">${translationData.total[lang]} (${record.currencyname}):</td><td class="text-right" align="right" style="padding: 10px; padding-left: 5px; padding-right: 20px;">${currencyType}${record.total?string(",##0.00##")}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
	</body>
</pdf>