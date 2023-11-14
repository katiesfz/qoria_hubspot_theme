<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><#if transaction.subsidiary??><#if transaction.subsidiary.name?lower_case?contains("qoria")><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2252000&c=6607213&h=V0NQqCUDOufDxAwi1LEoZpS-0o4kHrmJXBE8OJFufyqjcaBL&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258957&c=6607213&h=1MDq8ieCz4OfcM1z6TmbOKZ-6HCEYL8RC6k1KiB-k4dM_6St&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '180px' /><#if transaction.subsidiary.country = "Australia"><#assign subsidiaryName = "Qoria Holdings Pty Ltd" /><#assign subsidiaryAddress = "PO Box Z5397<br/>St Georges Tce, Perth, WA 6831, Australia" /><#elseif transaction.subsidiary.country = "New Zealand" /><#assign subsidiaryName = "Family Zone NZ Cyber Safety Ltd (New Zealand)" /><#assign subsidiaryAddress = "PO Box Z5397<br/>St Georges Tce, Perth, WA 6831, Australia" /><#elseif transaction.subsidiary.country = "United States" /><#assign subsidiaryName = "Family Zone Inc." /><#assign subsidiaryAddress = "10803 Thornmint Rd #100<br/>San Diego, CA 92127, United States" /></#if><#elseif transaction.subsidiary.name?lower_case?contains("family zone") /><#assign subsidiaryName = "Family Zone NZ Cyber Safety Ltd (New Zealand)" /><#assign subsidiaryAddress = "PO Box Z5397<br/>St Georges Tce, Perth, WA 6831, Australia" /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2252000&c=6607213&h=V0NQqCUDOufDxAwi1LEoZpS-0o4kHrmJXBE8OJFufyqjcaBL&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258957&c=6607213&h=1MDq8ieCz4OfcM1z6TmbOKZ-6HCEYL8RC6k1KiB-k4dM_6St&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '180px' /><#elseif transaction.subsidiary.name?lower_case?contains("educator") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2251994&c=6607213&h=M77HGGBcpavjMoYLeN-_eFwX8Rk-N9G5Btd9G98OU914bl7J&fcts=20230903214610&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258956&c=6607213&h=4WAtMRKh7EPUz4TqxTtH4MdwuJSmNgs1g0UHA0aonLrkMwNb&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '107px' /><#if transaction.subsidiary.country = "Australia"><#assign subsidiaryName = "EI Pty Ltd" /><#assign subsidiaryAddress = "PO Box Z5397, St Georges Tce<br/>Perth, WA 6831, Australia" /><#elseif transaction.subsidiary.country = "New Zealand" /><#assign subsidiaryName = "Family Zone NZ Cyber Safety Ltd (New Zealand)" /><#assign subsidiaryAddress = "PO Box Z5397, St Georges Tce<br/>Perth, WA 6831, Australia" /><#elseif transaction.subsidiary.country = "United States" /><#assign subsidiaryName = "EI, Inc" /><#assign subsidiaryAddress = "10803 Thornmint Rd #100<br/>San Diego, CA 92127, United States" /></#if><#elseif transaction.subsidiary.name?lower_case?contains("ysafe") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2251999&c=6607213&h=bKME6PvcClkyfkvrbF4bV3YzNQPwfU7_1IeIG9gY8x09OWw_&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258954&c=6607213&h=zv24p4vBE8erzvSKDj2brm_ZYUAQysTITPqnU6IrZDNdhLYy&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '51px' /><#assign subsidiaryName = "Cyber Education Pty Ltd (ySafe)" /><#assign subsidiaryAddress = "Level 3, 45 St Georges Tce<br/>Perth, WA 6000, Australia" /><#elseif transaction.subsidiary.name?lower_case?contains("literacy") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=1139267&c=6607213&h=8faLXpoTgkZuiGbK5fseg12PWSQVau1L-W8320kPwmwSLD_6&fcts=20221005081249&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=1139267&c=6607213&h=8faLXpoTgkZuiGbK5fseg12PWSQVau1L-W8320kPwmwSLD_6&fcts=20221005081249&whence=' /><#assign subsidiaryLogoWidth = '196px' /><#assign subsidiaryName = "Digital Literacy SL" /><#assign subsidiaryAddress = "Roger de Flor 193 Bajos<br/>Barcelona 08013, Spain" /><#elseif transaction.subsidiary.name?lower_case?contains("qustodio") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2251996&c=6607213&h=QYciYOhxRux7Uz5OkBcPFVfMANyiGSi2PdHnxcbZKEOwoSvU&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258961&c=6607213&h=AGLi7Hi90cNSgI4eSTaPv4cHnaS7k_tAWZF-zWZuVlSVbrfR&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '144px' /><#assign subsidiaryName = "Qustodio Technologies S.L" /><#assign subsidiaryAddress = "Roger de Flor 193 Bajos<br/>Barcelona 08013, Spain" /><#elseif transaction.subsidiary.name?lower_case?contains("netref") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2252001&c=6607213&h=P0p4CugC2fq3vHNqhi_VO6t6u7AU2IReF_9_JIv18QxBiS4Y&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258959&c=6607213&h=iXFMKnKfn-H5tNtpbLsbS2XGYy0eckX-vH3Gr88WHMy9aOyH&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '93px' /><#assign subsidiaryName = "Netref Education LLC" /><#assign subsidiaryAddress = "10803 Thornmint Rd #100<br/>San Diego, CA 92127, United States" /><#elseif transaction.subsidiary.name?lower_case?contains("esafe") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2251995&c=6607213&h=hrP-7ew2mvaPK3FeO1_phcqCSDBCG7DWHpU3xbCmsNSGOeby&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258958&c=6607213&h=Xd0gakuVgrns50hTzGTWY-EhE72Aruiqav7pLtqOjv7ahESb&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '96px' /><#assign subsidiaryName = "ESafe Global Limited" /><#assign subsidiaryAddress = "New Court, Regents Place, Regent Road<br/>Salford, M5 4HB, United Kingdom" /><#elseif transaction.subsidiary.name?lower_case?contains("cipafilter") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2251998&c=6607213&h=OAZG4HT0ZzD4mHKGghviUx7YywUOhxEghgPIT_84B1YGakDy&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258955&c=6607213&h=3nF_jWBeoWoHrxsHYxWRxG9SK3NvuRQevM2awDfPx9x8cKWy&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '172px' /><#assign subsidiaryName = "Cipafilter" /><#assign subsidiaryAddress = "700 16th Ave<br/>East Moline, IL 61244, United States" /><#elseif transaction.subsidiary.name?lower_case?contains("safeguard") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2251997&c=6607213&h=Brx6GwvjaPx33hbsK9SACKLOlWMVAHdXLLspoMWsXqTxXlOt&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258960&c=6607213&h=virP9vTXbRnG5mFQ3KGFpXCRgbFJVH5X3q_ffeUB6hDjE33c&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '161px' /><#assign subsidiaryName = "Safeguard Software Limited" /><#assign subsidiaryAddress = "Second Floor, 2 Whitehall Quay<br/>Leeds, LS1 4HR, United Kingdom" /><#elseif transaction.subsidiary.name?lower_case?contains("smoothwall") /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2251997&c=6607213&h=Brx6GwvjaPx33hbsK9SACKLOlWMVAHdXLLspoMWsXqTxXlOt&fcts=20230903214611&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2258960&c=6607213&h=virP9vTXbRnG5mFQ3KGFpXCRgbFJVH5X3q_ffeUB6hDjE33c&fcts=20230904234106&whence=' /><#assign subsidiaryLogoWidth = '161px' /><#if subsidiary.country = "United Kingdom"><#assign subsidiaryName = "Smoothwall Limited" /><#assign subsidiaryAddress = "Second Floor, 2 Whitehall Quay<br/>Leeds, LS1 4HR, United Kingdom" /><#elseif transaction.subsidiary.country = "United States" /><#assign subsidiaryName = "Smoothwall USA" /><#assign subsidiaryAddress = "1435 West Morehead Street, Suite 125<br/>Charlotte, NC 28208, United States" /></#if><#else /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2262785&c=6607213&h=viSda0ur7yGt0zygqPlv0WVi0O6ZMLgl1no0hULao39JaQpC&fcts=20230905205409&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2262785&c=6607213&h=viSda0ur7yGt0zygqPlv0WVi0O6ZMLgl1no0hULao39JaQpC&fcts=20230905205409&whence=' /><#assign subsidiaryLogoWidth = '118px' /><#assign subsidiaryName = "Qoria Holdings Pty Ltd" /><#assign subsidiaryAddress = "PO Box Z5397<br/>St Georges Tce, Perth, WA 6831, Australia" /></#if><#else /><#assign subsidiaryLogoSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2262785&c=6607213&h=viSda0ur7yGt0zygqPlv0WVi0O6ZMLgl1no0hULao39JaQpC&fcts=20230905205409&whence=' /><#assign subsidiaryLogoWhiteSrc = 'https://6607213.app.netsuite.com/core/media/media.nl?id=2262776&c=6607213&h=REaSL8JSd33cCBPOCmhSaoE1fBWsDGZmtwbkqcryyWHvSg_j&fcts=20230905204832&whence=' /><#assign subsidiaryLogoWidth = '118px' /><#assign subsidiaryName = "Qoria Holdings Pty Ltd" /><#assign subsidiaryAddress = "PO Box Z5397<br/>St Georges Tce, Perth, WA 6831, Australia" /></#if><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<style type="text/css">@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
</style>
<style type="text/css">/*<![CDATA[*/
/* ==== Mobile Styles ==== */

/* Constrain email width for small screens */
@media screen and (max-width: 650px) {
table[id="backgroundTable"] {
width: 95% !important;
}

table[id="templateTable"] {
max-width:700px !important;
width:100% !important;
}

table[id="contentTableInner"], .newsletter-section-inner {
max-width:700px !important;
width:100% !important;
}

/* Makes image expand to take 100% of width*/
img {
width: 100% !important;
height: auto !important;
}

#contentCell, #headerContentCell {
padding: 10px 10px !important;
}

#headerTable {
padding-right: 350px !important;
}

#contentTableOuter, .newsletter-section {
padding: 350px !important;
}
}

@media only screen and (max-width: 480px) {
/* ==== Client-Specific Mobile Styles ==== */
body, table, td, p, a, li, blockquote{
-webkit-text-size-adjust:none !important;
} /* Prevent Webkit platforms from changing default text sizes */
body{
width:100% !important;
min-width:100% !important;
} /* Prevent iOS Mail from adding padding to the body */

/* ==== Mobile Reset Styles ==== */
td[id="bodyCell"] {
padding:10px !important;
}

/* ==== Mobile Template Styles ==== */

table[id="templateTable"] {
max-width:700px !important;
width:100% !important;
}

table[id="contentTableInner"], .newsletter-section-inner {
max-width:700px !important;
width:100% !important;
}

/* ==== Image Alignment Styles ==== */

h1, .h1 {
font-size:26px !important;
line-height:125% !important;
}

h2, .h2 {
font-size:20px !important;
line-height:125% !important;
}

h3, .h3 {
font-size:15px !important;
line-height:125% !important;
}

h4, .h4 {
font-size:13px !important;
line-height:125% !important;
}

h5, .h5 {
font-size:11px !important;
line-height:125% !important;
}

h6, .h6 {
font-size:10px !important;
line-height:125% !important;
}

.hide {
display:none !important;
} /* Hide to save space */

/* ==== Body Styles ==== */

td[class="bodyContent"] {
font-size:16px !important;
line-height:145% !important;
padding: 30px !important;
}

/* ==== Footer Styles ==== */

td[id="footerTable"]{
padding-left: 0px !important;
padding-right: 0px !important;
font-size:12px !important;
line-height:145% !important;
}

/* ==== Image Alignment Styles ==== */

table[class="alignImageTable"] {
width: 100% !important;
}

td[class="imageTableTop"] {
display: none !important;
/*padding-top: 10px !important;*/
}
td[class="imageTableRight"] {
display: none !important;
}
td[class="imageTableBottom"] {
padding-bottom: 10px !important;
}
td[class="imageTableLeft"] {
display: none !important;
}

/* ==== Column Styles ==== */

td[class~="column"] {
display: block !important;
width: 100% !important;
padding-top: 0 !important;
padding-right: 0 !important;
padding-bottom: 0 !important;
padding-left: 0 !important;
}

td[class~=columnContent] {
font-size:14px !important;
line-height:145% !important;

padding-top: 10px !important;
padding-right: 10px !important;
padding-bottom: 10px !important;
padding-left: 10px !important;
}

#contentCell, #headerContentCell {
padding: 10px 0px !important;
}

#headerTable {
padding-right: 350px !important;
}

#contentTableOuter, .newsletter-section {
padding: 350px !important;
}
}

#preview_text {
display: none;
}
/*]]>*/
</style>
<!-- http://www.emailon@cid.com/blog/details/C13/ensure_that_your_entire_email_is_rendered_by_default_in_the_iphone_ipad --><!-- --><!-- --><!-- _/ _/ _/ _/_/_/ _/ --><!-- _/ _/ _/ _/ _/_/_/ _/ _/_/_/ _/_/ _/_/_/_/ --><!-- _/_/_/_/ _/ _/ _/ _/ _/_/ _/ _/ _/ _/ _/ --><!-- _/ _/ _/ _/ _/ _/ _/ _/ _/ _/ _/ _/ --><!-- _/ _/ _/_/_/ _/_/_/ _/_/_/ _/_/_/ _/_/ _/_/ --><!-- _/ --><!-- _/ --><!-- --><!-- Extra White Space! --><!-- --><!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --></head><body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;margin: 0;padding: 0;height: 100% !important;width: 100% !important;">
<div style="background-color: #ffffff;">
<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="backgroundTable" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-family: Quicksand, Verdana, sans-serif;margin: 0;padding: 0;border-collapse: collapse !important;height: 100% !important;width: 100% !important;" width="100%">
<tbody>
	<tr>
	<td align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-repeat: no-repeat;background-size: 100% auto;background-position: top center;margin: 0;padding: 0;height: 100% !important;width: 100% !important;" valign="top">
	<table border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 700px;-webkit-font-smoothing: antialiased;border-collapse: collapse !important;">
	<tbody>
		<tr>
		<td align="right" class="column" colspan="12" style="text-align: right;font-family: Quicksand, Verdana, sans-serif;font-size: 16px;line-height: 1.5em;color: #000000;padding: 32px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" valign="top" width="100.0%"><img src="${subsidiaryLogoSrc?html}" style="width: 100%;max-width: ${subsidiaryLogoWidth};height: auto;display: inline-block;margin-bottom: 0px;color: #ffffff;vertical-align: bottom;-ms-interpolation-mode: bicubic;" /></td>
		</tr>
		<tr>
		<td align="left" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;padding: 0px 32px 32px 32px; font-size: 1rem; line-height: 1.25em;" valign="top"><#if transaction.duedate?is_date_like><#assign d2 = transaction.duedate?long><#assign daysoverdue = ((.now?date?long - d2) / (24*60*60*1000))?floor><#assign dueDate = transaction.duedate?string['dd MMM yyyy']><#else><#assign d2 = ""><#assign daysoverdue = ""><#assign dueDate = transaction.duedate></#if><#assign invoiceDate = transaction.trandate?string['dd MMM yyyy']>
		<p>Hello,<br />
		<br />
		Please find attached invoice <strong>${transaction.tranid}. </strong></p>
		<#if transaction.subsidiary = "Qoria Holdings (Aus)">

		<table>
		<tbody>
			<tr>
			<td align="center" style="padding: 16px; background-color: #f8f8f8; margin: 32px 0;"><strong>IMPORTANT:</strong><br />
			On July 1, 2023 we updated our billing entity and bank details and these are provided below. If this is your first invoice since then, please check that you have udpated your systems with these new details before making payment.</td>
			</tr>
		</tbody>
		</table>
		</#if>

		<p><strong>Invoice date</strong>: ${invoiceDate}<br />
		<strong>Amount due</strong>: ${transaction.amountremainingtotalbox}<br />
		<strong>Due date</strong>: ${dueDate}<br />
		<strong>Purchase Order/Authoristion</strong>: ${transaction.otherrefnum}.<br />
		<strong>Remittance details</strong>:<br />
		${transaction.subsidiary.custrecord_ss_anz_sub_bank_details}<br />
		<br />
		Should you have any concerns or questions please do not hesitate to contact our Finance team.<br />
		<br />
		<strong>Regards<br />
		<br />
		The Linewize Finance team</strong></p>
		</td>
		</tr>
	</tbody>
	</table>
	<!-- End Template Container --></td>
	</tr>
	<tr>
	<td align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;padding: 10px 20px;" valign="top">
	<div style="background-color:#58b78e; width: 100%; max-width: 1000px;"><!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" src="https://qoria.com/hubfs/images/Email%20Assets/qoria-footer-bg.png" color="#58b78e"/>
</v:background>
<![endif]-->
	<table border="0" cellpadding="0" cellspacing="0" height="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;" width="100%">
	<tbody>
		<tr>
		<td align="center" background="https://qoria.com/hubfs/images/Email%20Assets/qoria-footer-bg.png" style="background-size: cover;background-position: center right;padding: 32px 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" valign="top">
		<div style="color: #fff; max-width: 700px; text-align: center;"><img src="${subsidiaryLogoWhiteSrc?html}" style="width: 100%;max-width: ${subsidiaryLogoWidth};height: auto;display: inline-block;margin-bottom: 16px;color: #ffffff;vertical-align: bottom;-ms-interpolation-mode: bicubic;" />
		<h4 style="text-align: center;color: #ffffff;margin-bottom: 5px;display: block;font-family: Quicksand, Verdana, sans-serif;font-weight: 300;line-height: 125%;margin-top: 0;margin-right: 0;margin-left: 0;font-size: 1.2rem;">Create cyber-safe communities where students thrive.</h4>

		<p class="small" style="color: #ffffff;text-align: center;margin-top: 0;font-weight: light;line-height: 125%;margin-bottom: 10px;font-size: 0.9rem;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">Support student wellbeing. Powerful insights and analytics. Engage your school community.</p>
		</div>
		</td>
		</tr>
	</tbody>
	</table>
	</div>
	</td>
	</tr>
	<tr>
	<td align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
	<p align="center" style="margin-bottom: 5px;line-height: 125%;font-size: 0.8rem;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">${subsidiaryName}</p>

	<p align="center" style="line-height: 125%;margin-bottom: 10px;font-size: 0.8rem;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">${subsidiaryAddress}</p>
	</td>
	</tr>
</tbody>
</table>
</div>
</body></html>