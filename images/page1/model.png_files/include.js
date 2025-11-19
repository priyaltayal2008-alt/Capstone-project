// Hello Molly
var _inside = _inside || [];
// var _inside = [];
var _insideLoaded = _insideLoaded || false;
var _insideJQ = _insideJQ || null;
var _insideConnectImmediately = true;
window._insideViewUpdate = window._insideViewUpdate || function () { };

(function () {
	if (_insideLoaded) {
		window._insideViewUpdate();
		return;
	}
	_insideLoaded = true;

	var accountKey = "IN-1001221";
	var trackerURL = "cdn9.au.inside.chat";
	var subsiteId = null;
	var insideOrderTotal = insideOrderTotal || 0;
	var _insideMaxLoop = 150;
	var _insideCurLoop = 0;
	var _insideFirstLoad = false;
	var _insideCart = null;
	var _insideCurrency = null;
	let _insideDataLayer = null;
	let _insideDataLayerIndex = 0;
	let _insideCurUrl = window.location.href;
	let _insideCurPageType = "other";

	function processInside(tracker) {
		var searchUrl = "/search/products/";
		var searchQueryString = null;
		var productCategoryUrl = "/collections";
		var productCategoryQueryString = null;
		var productUrl = null;
		var productQueryString = null;
		var checkoutUrl = "/checkout";
		var checkoutQueryString = "body.ge-checkout-body";
		var orderConfirmedUrl = "/thank_you";
		var orderConfirmedQueryString = null;
		var checkoutOpen = false;
		var checkoutPurchaseDone = false;

		// Utility Functions
		function log() {
			if (typeof (console) != "undefined" && typeof (console.log) != "undefined") {
				// console.log("[INSIDE]", Array.prototype.slice.call(arguments));
			}
		}

		// Call cart API
		// if (_insideCart == null) {
		// 	_insideJQ.getJSON('/cart.js', function (cart, textStatus) {
		// 		try {
		// 			_insideCart = cart;
		// 		} catch (tempex) { }
		// 	});
		// }

		var hashJoaat = function (b) { for (var a = 0, c = b.length; c--;)a += b.charCodeAt(c), a += a << 10, a ^= a >> 6; a += a << 3; a ^= a >> 11; return ((a + (a << 15) & 4294967295) >>> 0).toString(16) };

		function debounce(func, wait, immediate) {
			var timeout;
			return function () {
				var context = this, args = arguments;
				var later = function () {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};

		function validateEmail(tempmail) {
			try {
				if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(tempmail)) {
					return (true);
				}
			} catch (tempex) { }
			return (false);
		}

		function deferWait(callback, test) {
			if (test()) {
				callback();
				return;
			}
			var _interval = 10;
			var _spin = function () {
				if (test()) {
					callback();
				}
				else {
					_interval = _interval >= 1000 ? 1000 : _interval * 2;
					setTimeout(_spin, _interval);
				}
			};
			setTimeout(_spin, _interval);
		}

		function keepWait(callback, test) {
			if (test()) {
				callback();
				if (_insideCurLoop >= _insideMaxLoop) {
					return;
				}
			}
			var _interval = 2000;
			var _spin = function () {
				if (test()) {
					_insideCurLoop = _insideCurLoop + 1;
					callback();
					if (_insideCurLoop >= _insideMaxLoop) {
						return;
					}
				}
				setTimeout(_spin, _interval);
			};
			setTimeout(_spin, _interval);
		}

		var indexOf = [].indexOf || function (prop) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === prop)
					return i;
			}
			return -1;
		};

		function myTrim(text) {
			try {
				if (typeof (text) != "undefined" && text != null)
					return typeof (text.trim) === "function" ? text.trim() : text.replace(/^\s+|\s+$/gm, '');
			} catch (trimex) { }

			return text;
		}

		function isNumber(o) {
			return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
		}

		function isNumeric(n) {
			try {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}
			catch (tempex) {
			}

			return false;
		}

		function setCookie(cname, cvalue, exdays) {
			var hostName = window.location.hostname;
			var siteNameFragments = hostName.split(".");
			var siteName = siteNameFragments[1];
			var domain = siteNameFragments.slice(1, siteNameFragments.length).join(".");

			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toGMTString();
			document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/" + ";domain=." + domain;
		}

		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = myTrim(ca[i]);
				if (c.indexOf(name) == 0)
					return c.substring(name.length, c.length);
			}
			return null;
		}

		function deleteCookie(cname) {
			document.cookie = cname + "=" + 0 + "; " + "expires=01 Jan 1970 00:00:00 GMT" + ";path=/";
		}

		function roundToTwo(num) {
			if (Math != "undefined" && Math.round != "undefined")
				return +(Math.round(num + "e+2") + "e-2");
			else
				return num;
		}

		function getSearchParameters() {
			var prmstr = window.location.search.substr(1);
			return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : [];
		}

		function transformToAssocArray(prmstr) {
			var params = [];
			var prmarr = prmstr.split("&");
			for (var i = 0; i < prmarr.length; i++) {
				params[i] = prmarr[i];
			}

			return params;
		}

		function randomIntFromInterval(min, max) {
			try {
				return Math.floor(Math.random() * (max - min + 1) + min);
			}
			catch (tempex) {
			}

			return min;
		}

		function getDecimalSign(number) {
			try {
				var tempnum = myTrim(number);

				if (number.length > 3) {
					return number.charAt(number.length - 3);
				}
			}
			catch (signex) {
			}

			return ".";
		}

		// End of utility functions

		function getViewData() {
			try {

				// Output view data
				// Default view data is "unknown"

				var data = {};

				data.action = "trackView";
				data.type = "article";
				data.url = window.location.href;
				data.name = "Unknown Page: " + window.location.href;
				var tempurl = window.location.href.toLowerCase();

				var temppath = window.location.pathname;
				var temp_loc = temppath.split("/");
				var page = "";

				var add_tags = [];
				var params = getSearchParameters();
				var searchterm = "Search"; // Find the searchterm the
				// visitor
				// entered for the search page to be
				// used as the page name
				if (params != null && params.length > 0) {
					for (var i = 0; i < params.length; i++) {
						if (params[i].indexOf("q=") == 0) {
							searchterm = params[i].split("q=")[1];
						}
					}
				}

				for (var i = 1; i < temp_loc.length; i++) {
					if (temp_loc[i] != null && temp_loc[i].length > 0)
						page = temp_loc[i];
				}
				var curpage = page.split("?")[0];

				// Identify and assign the correct page type here
				// The part below is actually very flexible, can use
				// dataLayer too
				// sometimes, etc so if needed can also just delete the
				// global
				// variable parts and make your own algorithm. From my
				// experience
				// the following part will rarely work for all websites.

				var temppagetype = "other";
				try {
					if (typeof (window.ShopifyAnalytics) != "undefined" && window.ShopifyAnalytics != null
						&& typeof (window.ShopifyAnalytics.meta) != "undefined" && window.ShopifyAnalytics.meta != null
						&& typeof (window.ShopifyAnalytics.meta.page) != "undefined" && window.ShopifyAnalytics.meta.page != null
						&& typeof (window.ShopifyAnalytics.meta.page.pageType) != "undefined" && window.ShopifyAnalytics.meta.page.pageType != null
						&& window.ShopifyAnalytics.meta.page.pageType.length > 0) {
						temppagetype = window.ShopifyAnalytics.meta.page.pageType.toLowerCase();
					}

					if (typeof (dataLayer) != "undefined" && dataLayer != null) {
						for (let i = window.dataLayer.length - 1; i >= _insideDataLayerIndex; i--) {
							const tempDataLayer = window.dataLayer[i];
							if (tempDataLayer.event && tempDataLayer.event == "dl_user_data") {
								_insideDataLayer = tempDataLayer;
								_insideDataLayerIndex = i;
								break;
							}
						}

						for (let i = window.dataLayer.length - 1; i >= _insideDataLayerIndex - 2; i--) {
							const tempDataLayer = window.dataLayer[i];
							if (tempDataLayer.event && tempDataLayer.event == "dl_view_item") {
								temppagetype = "product";
								break;
							}
						}
					}
				} catch (tempex) { }

				if (productCategoryUrl != null) {
					if (tempurl.indexOf(productCategoryUrl.toLowerCase()) > -1) {
						data.type = "productcategory";
					}
				}
				if (productCategoryQueryString != null) {
					var tempelem = _insideJQ(productCategoryQueryString);
					if (tempelem != null && tempelem.length > 0) {
						data.type = "productcategory";
					}
				}

				if ((temppath == "/" || curpage == "index.html") && temp_loc.length < 3) {
					data.type = "homepage";
				}
				else if (temppagetype == "home") {
					data.type = "homepage";
				}
				else if (temppagetype == "collection") {
					data.type = "productcategory";
				}
				else if (temppagetype == "product") {
					data.type = "product";
				}
				else if (data.url.indexOf("/account/login") != -1 || data.url.indexOf("/account/register") != -1) {
					data.type = "login";
				}

				if (searchUrl != null) {
					if (tempurl.indexOf(searchUrl.toLowerCase()) > -1) {
						data.type = "search";
					}
				}
				if (searchQueryString != null) {
					var tempelem = _insideJQ(searchQueryString);
					if (tempelem != null && tempelem.length > 0) {
						data.type = "search";
					}
				}

				if (productUrl != null) {
					if (tempurl.indexOf(productUrl.toLowerCase()) > -1) {
						data.type = "product";
					}
				}
				if (productQueryString != null) {
					var tempelem = _insideJQ(productQueryString);
					if (tempelem != null && tempelem.length > 0) {
						data.type = "product";
					}
				}

				if (checkoutUrl != null) {
					if (tempurl.indexOf(checkoutUrl.toLowerCase()) > -1 || tempurl.indexOf("/cart") > -1) {
						data.type = "checkout";
					}
				}
				if (checkoutQueryString != null) {
					var tempelem = _insideJQ(checkoutQueryString);
					if (tempelem != null && tempelem.length > 0) {
						data.type = "checkout";

						var tempconfirms = orderConfirmProcess();
						if (tempconfirms != null && tempconfirms.length > 0) {
							data.type = "orderconfirmed";
						}
					}
				}

				if (orderConfirmedUrl != null) {
					if (tempurl.indexOf(orderConfirmedUrl.toLowerCase()) > -1) {
						data.type = "orderconfirmed";
					}
				}
				if (orderConfirmedQueryString != null) {
					var tempelem = _insideJQ(orderConfirmedQueryString);
					if (tempelem != null && tempelem.length > 0) {
						data.type = "orderconfirmed";
					}
				}

				try {
					if (typeof (_insideData) != "undefined" && _insideData != null && _insideData.name && _insideData.name == "checkout_completed") {
						data.type = "orderconfirmed";
					}
				} catch (tempex) { }

				// Finish identying

				switch (data.type) {
					case "homepage":
						data.name = "Home";
						break;
					case "search":
						data.name = "Search Result Page";
						if (curpage != null && curpage.length > 0) {
							data.name = decodeURIComponent(curpage);
							if (data.name.indexOf("+") != -1) {
								data.name = data.name.replace(/\+/g, ' ');
							}
						}
						break;
					case "productcategory":
						var tempcat = getCategory();
						if (tempcat != null && tempcat.length > 0) {
							if (tempcat.length > 149)
								tempcat = tempcat.substring(0, 149);
							data.category = tempcat;
						}

						var tempPageName = getPageName();
						if (tempPageName != null && tempPageName.length > 0)
							data.name = tempPageName;

						break;
					case "product":
						var tempPageName = getPageName();
						if (tempPageName != null && tempPageName.length > 0)
							data.name = tempPageName;

						tempPageName = getProductName();
						if (tempPageName != null && tempPageName.length > 0)
							data.name = tempPageName;

						var tempcat = getCategory();
						if (tempcat != null && tempcat.length > 0) {
							if (tempcat.length > 149)
								tempcat = tempcat.substring(0, 149);
							data.category = tempcat;
						}

						var tempval = getProductImage();
						if (tempval != null && tempval.length > 0)
							data.img = tempval;

						var tempsku = getProductSku();
						if (tempsku != null) {
							data.sku = tempsku;
							// data.name = data.name + " - " + tempsku;
						}
						else {
							data.type = "other";
						}

						var tempprice = getProductPrice();
						if (tempprice != null && tempprice > 0)
							data.price = tempprice;
						break;
					case "orderconfirmed":
						data.name = "Order Confirmed";
						break;
					default:
						var tempPageName = getPageName();
						if (tempPageName != null && tempPageName.length > 0)
							data.name = tempPageName;
				}

				if (add_tags.length > 0) {
					data.tags = add_tags.join(",");
				}

				// Get view data from page

				return data;
			}
			catch (ex) {
				if (typeof (console) != "undefined" && typeof (console.log) != "undefined")
					log("getViewData error: ", ex);
				return null;
			}
		}

		function getPageName() {
			// Modify if necessary
			try {
				var content = document.getElementsByTagName("title");
				if (typeof (content) != "undefined" && content != null && content.length > 0) {
					var result = content[0].textContent || content[0].innerText;
					if (typeof (result) != "undefined" && result != null && result.length > 0) {
						return myTrim(result);
					}
				}
			} catch (pagenameex) { }

			return null;
		}

		function getProductName() {
			try {
				for (let i = window.dataLayer.length - 1; i >= _insideDataLayerIndex - 2; i--) {
					const tempDataLayer = window.dataLayer[i];
					if (tempDataLayer.event && tempDataLayer.event == "dl_view_item") {
						if (tempDataLayer.ecommerce && tempDataLayer.ecommerce.detail && tempDataLayer.ecommerce.detail.products && tempDataLayer.ecommerce.detail.products.length > 0) {
							if (tempDataLayer.ecommerce.detail.products[0].name)
								return tempDataLayer.ecommerce.detail.products[0].name;
						}
					}
				}
			} catch (tempex) { }

			try {
				var metaTags = document.getElementsByTagName("meta");

				var fbAppIdContent = "";
				for (var i = 0; i < metaTags.length; i++) {
					if (metaTags[i].getAttribute("property") == "og:title") {
						fbAppIdContent = metaTags[i].getAttribute("content");
						return fbAppIdContent;
					}
				}
			}
			catch (imageex) {
			}

			return null;
		}

		function getProductImage() {
			try {
				for (let i = window.dataLayer.length - 1; i >= _insideDataLayerIndex - 2; i--) {
					const tempDataLayer = window.dataLayer[i];
					if (tempDataLayer.event && tempDataLayer.event == "dl_view_item") {
						if (tempDataLayer.ecommerce && tempDataLayer.ecommerce.detail && tempDataLayer.ecommerce.detail.products && tempDataLayer.ecommerce.detail.products.length > 0) {
							if (tempDataLayer.ecommerce.detail.products[0].image)
								return tempDataLayer.ecommerce.detail.products[0].image;
						}
					}
				}
			} catch (tempex) { }

			try {
				var metaTags = document.getElementsByTagName("meta");

				var fbAppIdContent = "";
				for (var i = 0; i < metaTags.length; i++) {
					if (metaTags[i].getAttribute("property") == "og:image") {
						fbAppIdContent = metaTags[i].getAttribute("content");
						return fbAppIdContent;
					}
				}
			}
			catch (imageex) {
			}

			return null;
		}

		function getProductPrice() {
			try {
				var metaTags = document.getElementsByTagName("meta");

				var fbAppIdContent = "";
				for (var i = 0; i < metaTags.length; i++) {
					if (metaTags[i].getAttribute("property") == "product:price:amount") {
						fbAppIdContent = metaTags[i].getAttribute("content");
						return fbAppIdContent;
					}
				}
			}
			catch (imageex) {
			}

			try {
				for (let i = window.dataLayer.length - 1; i >= _insideDataLayerIndex - 2; i--) {
					const tempDataLayer = window.dataLayer[i];
					if (tempDataLayer.event && tempDataLayer.event == "dl_view_item") {
						if (tempDataLayer.ecommerce && tempDataLayer.ecommerce.detail && tempDataLayer.ecommerce.detail.products && tempDataLayer.ecommerce.detail.products.length > 0) {
							if (tempDataLayer.ecommerce.detail.products[0].price)
								return parseFloat(tempDataLayer.ecommerce.detail.products[0].price);
						}
					}
				}
			} catch (tempex) { }

			return null;
		}

		function getProductSku() {
			try {
				if (typeof (window.ShopifyAnalytics) != "undefinded" && window.ShopifyAnalytics != null && window.ShopifyAnalytics.meta && window.ShopifyAnalytics.meta.product) {
					if (window.ShopifyAnalytics.meta.product.variants && _insideJQ.isArray(window.ShopifyAnalytics.meta.product.variants)) {
						if (window.ShopifyAnalytics.meta.product.variants.length > 0)
							if (window.ShopifyAnalytics.meta.product.variants[0] && window.ShopifyAnalytics.meta.product.variants[0].sku)
								return window.ShopifyAnalytics.meta.product.variants[0].sku;
					}

					if (window.ShopifyAnalytics.meta.product.id)
						return window.ShopifyAnalytics.meta.product.id;
				}
			}
			catch (tempex) {
			}

			try {
				for (let i = window.dataLayer.length - 1; i >= _insideDataLayerIndex - 2; i--) {
					const tempDataLayer = window.dataLayer[i];
					if (tempDataLayer.event && tempDataLayer.event == "dl_view_item") {
						if (tempDataLayer.ecommerce && tempDataLayer.ecommerce.detail && tempDataLayer.ecommerce.detail.products && tempDataLayer.ecommerce.detail.products.length > 0) {
							if (tempDataLayer.ecommerce.detail.products[0].id)
								return tempDataLayer.ecommerce.detail.products[0].id;
						}
					}
				}
			} catch (tempex) { }

			return null;
		}

		function getCategory() {
			try {
				var breadcrumbs = _insideJQ(".breadcrumbs");

				if (breadcrumbs != null && breadcrumbs.length > 0) {
					breadcrumbs = breadcrumbs[0].getElementsByTagName("li");
					if (breadcrumbs != null && breadcrumbs.length > 0) {
						var path = "";
						for (var i = 1; i < breadcrumbs.length; i++) {
							var temp = breadcrumbs[i].innerText || breadcrumbs[i].textContent;
							var tempelem = breadcrumbs[i].getElementsByTagName("a");
							if (tempelem != null && tempelem.length > 0) {
								temp = tempelem[0].innerText || tempelem[0].textContent;
							}
							temp = myTrim(temp);
							if (temp != "/")
								path += (path != "" ? " / " : "") + temp;
						}
						if (path != "")
							return path;
					}

				}
			}
			catch (tempex) {
			}

			try {
				for (let i = window.dataLayer.length - 1; i >= _insideDataLayerIndex - 2; i--) {
					const tempDataLayer = window.dataLayer[i];
					if (tempDataLayer.event && tempDataLayer.event == "dl_view_item") {
						if (tempDataLayer.ecommerce && tempDataLayer.ecommerce.detail && tempDataLayer.ecommerce.detail.products && tempDataLayer.ecommerce.detail.products.length > 0) {
							if (tempDataLayer.ecommerce.detail.products[0].category)
								return tempDataLayer.ecommerce.detail.products[0].category;
						}
					}
				}
			} catch (tempex) { }

			return null;
		}

		function getOrderData() {
			try {
				var data = [];
				var totalprice = 0;
				var orderId = "auto";

				if (_insideCart != null && typeof (_insideCart.items) != "undefined" && _insideCart.items != null && _insideCart.items.length > 0) {
					for (var i = 0; i < _insideCart.items.length; i++) {
						var tempitem = {};
						tempitem.action = "addItem";
						tempitem.orderId = orderId;
						var tempdetail = _insideCart.items[i];
						tempitem.name = tempdetail.product_title;
						tempitem.sku = tempdetail.sku;
						// tempitem.sku = tempdetail.product_id;
						tempitem.price = tempdetail.price / 100;
						tempitem.qty = tempdetail.quantity;
						tempitem.product_id = tempdetail.product_id;
						tempitem.img = tempdetail.image;

						totalprice = totalprice + (tempitem.qty * tempitem.price);

						data.push(tempitem);
					}
				}

				if (data.length > 0) {

					totalprice = _insideCart.total_price / 100;

					var temporderdata = {
						"action": "trackOrder",
						"orderId": orderId,
						"orderTotal": totalprice
					};

					try {
						if (ShopifyAnalytics && ShopifyAnalytics.meta && ShopifyAnalytics.meta.currency && ShopifyAnalytics.meta.currency.length > 0) {
							temporderdata.data = {};
							temporderdata.data.currency = ShopifyAnalytics.meta.currency;
						}
					} catch (currencyex) { }

					data.push(temporderdata);

					return data;
				}
			}
			catch (ex) {
				log("getOrderData error. ", ex);
			}

			try {
				var data = [];
				var totalprice = 0;
				var orderId = "auto";

				if (typeof (_insideData) != "undefined" && _insideData != null && _insideData.data && _insideData.data.checkout && _insideData.data.checkout.lineItems && _insideData.data.checkout.lineItems.length > 0) {
					for (var i = 0; i < _insideData.data.checkout.lineItems.length; i++) {
						var tempitem = {};
						tempitem.action = "addItem";
						tempitem.orderId = orderId;
						var tempdetail = _insideData.data.checkout.lineItems[i];
						tempitem.name = tempdetail.title;
						if (tempdetail.variant.sku)
							tempitem.sku = tempdetail.variant.sku;
						if (tempdetail.variant && tempdetail.variant.product && tempdetail.variant.product.id)
							tempitem.sku = tempdetail.variant.product.id;
						tempitem.price = tempdetail.variant.price.amount;
						tempitem.qty = tempdetail.quantity;
						if (tempdetail.variant && tempdetail.variant.product && tempdetail.variant.product.id)
							tempitem.product_id = tempdetail.variant.product.id;
						tempitem.img = tempdetail.variant.image.src;

						totalprice = totalprice + (tempitem.qty * tempitem.price);

						data.push(tempitem);
					}
				}

				if (data.length > 0) {

					try {
						if (_insideData.data.checkout.totalPrice && _insideData.data.checkout.totalPrice.amount)
							totalprice = _insideData.data.checkout.totalPrice.amount;
					} catch (tempex) { }

					var temporderdata = {
						"action": "trackOrder",
						"orderId": orderId,
						"orderTotal": totalprice
					};

					data.push(temporderdata);

					return data;
				}
			}
			catch (ex) {
				log("getOrderData error. ", ex);
			}

			try {
				var data = [];
				var totalprice = 0;
				var orderId = "auto";

				if (_insideDataLayer && _insideDataLayer.ecommerce && _insideDataLayer.ecommerce.cart_contents && _insideDataLayer.ecommerce.cart_contents.products && _insideDataLayer.ecommerce.cart_contents.products.length > 0) {
					for (var i = 0; i < _insideDataLayer.ecommerce.cart_contents.products.length; i++) {
						var tempitem = {};
						tempitem.action = "addItem";
						tempitem.orderId = orderId;
						var tempdetail = _insideDataLayer.ecommerce.cart_contents.products[i];
						tempitem.name = tempdetail.name;
						if (tempdetail.id)
							tempitem.sku = tempdetail.id;
						if (tempdetail.variant_id)
							tempitem.sku = tempdetail.variant_id;
						tempitem.price = parseFloat(tempdetail.price);
						tempitem.qty = parseFloat(tempdetail.quantity);

						try {
							if (tempdetail.image) {
								tempitem.img = tempdetail.image;
							}

							if (tempdetail.category) {
								tempitem.category = tempdetail.category;
								if (tempitem.category.length > 149)
									tempitem.category = tempitem.category.substring(0, 149);
							}
						} catch (tempex) { }

						totalprice = totalprice + (tempitem.qty * tempitem.price);

						data.push(tempitem);
					}
				}
				else if (_insideDataLayerIndex) {
					if (dataLayer[_insideDataLayerIndex - 1] && dataLayer[_insideDataLayerIndex - 1].ecommerce && dataLayer[_insideDataLayerIndex - 1].ecommerce.cart_contents && dataLayer[_insideDataLayerIndex - 1].ecommerce.cart_contents.products) {
						for (var i = 0; i < dataLayer[_insideDataLayerIndex - 1].ecommerce.cart_contents.products.length; i++) {
							var tempitem = {};
							tempitem.action = "addItem";
							tempitem.orderId = orderId;
							var tempdetail = dataLayer[_insideDataLayerIndex - 1].ecommerce.cart_contents.products[i];
							tempitem.name = tempdetail.name;
							if (tempdetail.id)
								tempitem.sku = tempdetail.id;
							if (tempdetail.variant_id)
								tempitem.sku = tempdetail.variant_id;
							tempitem.price = parseFloat(tempdetail.price);
							tempitem.qty = parseFloat(tempdetail.quantity);

							try {
								if (tempdetail.image) {
									tempitem.img = tempdetail.image;
								}

								if (tempdetail.category) {
									tempitem.category = tempdetail.category;
									if (tempitem.category.length > 149)
										tempitem.category = tempitem.category.substring(0, 149);
								}
							} catch (tempex) { }

							totalprice = totalprice + (tempitem.qty * tempitem.price);

							data.push(tempitem);
						}
					}
				}

				if (data.length > 0) {
					var temporderdata = {
						"action": "trackOrder",
						"orderId": orderId,
						"orderTotal": totalprice
					};

					data.push(temporderdata);

					return data;
				}
			}
			catch (ex) {
				log("getOrderData error. ", ex);
			}

			return null;
		}

		function orderConfirmProcess() {
			try {// Using this so order link will work
				var data = [];

				var detail = null;
				if (typeof (Shopify) != "undefined" && Shopify != null && typeof (Shopify.checkout) != "undefined" && Shopify.checkout != null) {
					detail = Shopify.checkout;
				}

				if (detail != null) {
					var totalprice = detail.total_price;
					var orderID = detail.order_id;

					var tempdata = {};
					try {
						var tempcontent = _insideJQ(".os-order-number");
						if (tempcontent != null && tempcontent.length == 1) {
							var temporderid = tempcontent.text();
							if (temporderid != null && temporderid.length > 0 && temporderid.indexOf("#") != -1) {
								temporderid = myTrim(temporderid.split("#")[1]);
								if (temporderid != null && temporderid.length > 0) {
									tempdata.other_order_id = temporderid;
								}
							}
						}

						if (ShopifyAnalytics && ShopifyAnalytics.meta && ShopifyAnalytics.meta.currency && ShopifyAnalytics.meta.currency.length > 0) {
							tempdata.currency = ShopifyAnalytics.meta.currency;
						}
						// if (typeof (Shopify.checkout.currency) != "undefined" && Shopify.checkout.currency != null && Shopify.checkout.currency.length > 0) {
						// 	tempdata.currency = Shopify.checkout.currency.toUpperCase();
						// }
					}
					catch (tempex) {
					}

					try {
						var lastOrderID = sessionStorage.getItem("insidelastorderid");
						if (lastOrderID == orderID) {
							return null;
						}
					}
					catch (numex) {
					}

					if (typeof (orderID) != "undefined" && orderID != null && orderID != "auto") {

						data.push({
							"action": "trackOrder",
							"orderId": "auto",
							"newOrderId": orderID,
							"orderTotal": totalprice,
							"data": tempdata,
							"update": true,
							"complete": true
						});
					}

					return data;
				}

			}
			catch (ex) {
				log("orderConfirmProcess error. ", ex);
			}

			try {// Using this so order link will work
				var data = [];

				var detail = null;
				if (typeof (_insideData) != "undefined" && _insideData != null && _insideData.data && _insideData.data.checkout && _insideData.data.checkout.order && _insideData.data.checkout.order.id) {
					detail = _insideData.data.checkout;
				}

				if (detail != null) {
					var totalprice = detail.totalPrice.amount;
					var orderID = detail.order.id;

					var tempdata = {};
					try {
						if (detail.shippingLine && detail.shippingLine.price && detail.shippingLine.price.amount) {
							tempdata.shipping = detail.shippingLine.price.amount;
						}
						if (detail.totalTax && detail.totalTax.amount) {
							tempdata.tax = detail.totalTax.amount;
						}
						if (detail.currencyCode) {
							tempdata.currency = _insideData.data.checkout.currencyCode.toUpperCase();
						}
					}
					catch (tempex) {
					}

					try {
						var lastOrderID = sessionStorage.getItem("insidelastorderid");
						if (lastOrderID == orderID) {
							return null;
						}
					}
					catch (numex) {
					}

					try {
						if (typeof (_insideData) != "undefined" && _insideData != null && _insideData.data && _insideData.data.checkout && _insideData.data.checkout.lineItems && _insideData.data.checkout.lineItems.length > 0) {
							for (let i = 0; i < _insideData.data.checkout.lineItems.length; i++) {
								let tempitem = {};
								tempitem.action = "addItem";
								tempitem.orderId = "auto";
								let tempdetail = _insideData.data.checkout.lineItems[i];
								tempitem.name = tempdetail.title;
								if (tempdetail.variant.sku)
									tempitem.sku = tempdetail.variant.sku;
								if (tempdetail.variant && tempdetail.variant.product && tempdetail.variant.product.id)
									tempitem.sku = tempdetail.variant.product.id;
								tempitem.price = tempdetail.variant.price.amount;
								tempitem.qty = tempdetail.quantity;
								if (tempdetail.variant && tempdetail.variant.product && tempdetail.variant.product.id)
									tempitem.product_id = tempdetail.variant.product.id;
								tempitem.img = tempdetail.variant.image.src;

								data.push(tempitem);
							}
						}
					} catch (tempx) { }

					if (typeof (orderID) != "undefined" && orderID != null && orderID != "auto") {

						let updateBool = true;
						if (data.length > 0)
							updateBool = false;

						data.push({
							"action": "trackOrder",
							"orderId": "auto",
							"newOrderId": orderID,
							"orderTotal": totalprice,
							"data": tempdata,
							"update": updateBool,
							"complete": true
						});

						return data;
					}
				}

			}
			catch (ex) {
				log("orderConfirmProcess error. ", ex);
			}

			return null;
		}

		function getVisitorId() {
			try {
				for (let i = window.dataLayer.length - 1; i >= 0; i--) {
					const tempval = window.dataLayer[i];

					if (tempval && tempval.user_properties && tempval.user_properties.customer_email && validateEmail(tempval.user_properties.customer_email) && tempval.user_properties.visitor_type && tempval.user_properties.visitor_type == "logged_in" && tempval.user_properties.customer_id) {
						return tempval.user_properties.customer_id;
					}
				}
			} catch (tempex) { }

			return null;
		}

		function getVisitorName() {
			try {
				for (let i = window.dataLayer.length - 1; i >= 0; i--) {
					const tempval = window.dataLayer[i];

					if (tempval && tempval.user_properties && tempval.user_properties.customer_email && validateEmail(tempval.user_properties.customer_email) && tempval.user_properties.visitor_type && tempval.user_properties.visitor_type == "logged_in" && tempval.user_properties.customer_id && tempval.user_properties.customer_first_name && tempval.user_properties.customer_last_name) {
						return tempval.user_properties.customer_first_name + " " + tempval.user_properties.customer_last_name;
					}
				}
			} catch (tempex) { }


			return null;
		}

		function getVisitorData() {
			var tempdata = {}

			try {
				var templang = _insideJQ("html").attr("lang");
				if (templang) {
					tempdata.language = templang;
				}

				for (let i = window.dataLayer.length - 1; i >= 0; i--) {
					const tempval = window.dataLayer[i];

					if (tempval && tempval.user_properties && tempval.user_properties.customer_email && validateEmail(tempval.user_properties.customer_email) && tempval.user_properties.visitor_type && tempval.user_properties.visitor_type == "logged_in" && tempval.user_properties.customer_id) {
						tempdata.user_email = tempval.user_properties.customer_email;

						if (tempval.user_properties.customer_first_name && tempval.user_properties.customer_last_name) {
							tempdata.user_name = tempval.user_properties.customer_first_name + " " + tempval.user_properties.customer_last_name;
						}
						break;
					}
				}
			} catch (langex) { }

			return tempdata;
		}

		function insertInsideTag() {
			try {
				_insideGraph.processQueue();
			}
			catch (tempex) {
			}
		}

		function sendToInside() {
			try {
				tracker.url = window.location.href;

				var visitorId = getVisitorId();
				if (visitorId) {
					tracker.visitorId = visitorId;
				}

				var visitorName = getVisitorName();
				if (visitorName != null && visitorName.length > 0) {
					tracker.visitorName = visitorName;
				}

				var visitorData = getVisitorData();
				if (visitorData != null) {
					tracker.visitorData = visitorData;
				}

				var view = getViewData();
				if (view != null) {
					if (view.type == "orderconfirmed") {
						var tempconfirm = orderConfirmProcess();
						if (tempconfirm != null && tempconfirm.length > 0) {

							var orderconfirmcheck = false;
							try {
								if (typeof (_insideData) != "undefined" && _insideData != null && _insideData.data && _insideData.data.checkout && _insideData.data.checkout.order && _insideData.data.checkout.order.id) {
									orderconfirmcheck = true;
								}
							} catch (checkex) { }

							// To add delay
							if (orderconfirmcheck) {
								var orderData = getOrderData();

								if (orderData != null && orderData.length > 0) {
									for (var i = 0; i < orderData.length; i++) {
										_inside.push(orderData[i]);
										if (orderData[i].action == "trackOrder") {
											view.orderId = orderData[i].orderId;
											view.orderTotal = orderData[i].orderTotal;
											insideOrderTotal = orderData[i].orderTotal;
										}
									}
								}

								setTimeout(function () {
									if (tempconfirm != null && tempconfirm.length > 0) {
										for (var i = 0; i < tempconfirm.length; i++) {
											_inside.push(tempconfirm[i]);

											try {
												if (tempconfirm[i].action == "trackOrder")
													if (typeof (tempconfirm[i].newOrderId) != "undefined" && tempconfirm[i].newOrderId != null)
														sessionStorage.setItem("insidelastorderid", tempconfirm[i].newOrderId);
											}
											catch (tempex) {
											}
										}

										insertInsideTag();
									}
								}, 300);
							}
							else {
								for (var i = 0; i < tempconfirm.length; i++) {
									_inside.push(tempconfirm[i]);

									try {
										if (tempconfirm[i].action == "trackOrder")
											if (typeof (tempconfirm[i].newOrderId) != "undefined" && tempconfirm[i].newOrderId != null)
												sessionStorage.setItem("insidelastorderid", tempconfirm[i].newOrderId);
									}
									catch (tempex) {
									}
								}
							}
						}
					}
					else {
						var orderData = getOrderData();

						if (orderData != null && orderData.length > 0) {
							for (var i = 0; i < orderData.length; i++) {
								_inside.push(orderData[i]);
								if (orderData[i].action == "trackOrder") {
									view.orderId = orderData[i].orderId;
									view.orderTotal = orderData[i].orderTotal;
									insideOrderTotal = orderData[i].orderTotal;
								}
							}
						}
					}

					// Add currency code
					try {
						try {
							if (typeof (ShopifyAnalytics) != "undefined" && ShopifyAnalytics != null && ShopifyAnalytics.meta && ShopifyAnalytics.meta.currency && ShopifyAnalytics.meta.currency.length > 0) {
								_insideCurrency = ShopifyAnalytics.meta.currency;
							}
							else {
								if (typeof (_insideData) != "undefined" && _insideData != null && _insideData.data && _insideData.data.checkout && _insideData.data.checkout.currencyCode) {
									_insideCurrency = _insideData.data.checkout.currencyCode;
								}
							}

							if (typeof (dataLayer) != "undefined" && dataLayer != null) {
								for (let i = window.dataLayer.length - 1; i >= 0; i--) {
									const tempDataLayer = window.dataLayer[i];
									if (tempDataLayer.ecommerce && tempDataLayer.ecommerce.currencyCode) {
										_insideCurrency = tempDataLayer.ecommerce.currencyCode;
										break;
									}
								}
							}
						} catch (tempex) { }

						if (_insideCurrency) {
							if (_inside != null && _inside.length > 0) {
								for (var i = 0; i < _inside.length; i++) {
									if (_inside[i].action == "trackOrder") {
										if (typeof (_inside[i].data) == "undefined" || _inside[i].data == null) {
											_inside[i].data = {};
										}

										if (typeof (_inside[i].data.currency) == "undefined" || _inside[i].data.currency == null) {
											_inside[i].data.currency = _insideCurrency;
										}
									}
								}
							}

							if (typeof (view.data) == "undefined" || view.data == null) {
								view.data = {};
							}
							view.data.currency = _insideCurrency;

							if (typeof (tracker.visitorData) == "undefined" || tracker.visitorData == null) {
								tracker.visitorData = {};
							}
							tracker.visitorData.currency = _insideCurrency;
						}
					} catch (currencyex) { }

					try {
						_insideCurUrl = window.location.href;
						_insideCurPageType = view.type;
					} catch (tempex) { }

					_inside.push(view);

					log("Inside Debug: ", _inside);
				}
			}
			catch (sendex) {
				_inside = [];

				_inside.push({
					"action": "trackView",
					"type": "other",
					"name": "Check: " + window.location.href
				});

				log(sendex);
			}

			insertInsideTag();
			if (!_insideFirstLoad)
				_insideFirstLoad = true;
		}

		// window._insideViewUpdate = function () { setTimeout(sendToInside, 1000); };

		window._insideViewUpdate = debounce(function () {
			var triggerupdate = true;
			try {
				// var temphashj = hashJoaat(JSON.stringify(_insideDataLayer))
				// if (temphashj == _insideHashJ)
				// 	triggerupdate = false;
			} catch (tempex) { }

			if (triggerupdate) {
				setTimeout(sendToInside, 1000);
			}
		}, 500);

		var tempview = getViewData();
		if (tempview != null && typeof (tempview.type) != "undefined" && tempview.type != null && tempview.type == "orderconfirmed") {
			deferWait(sendToInside, function () {
				var tempconfirm = orderConfirmProcess();
				if (tempconfirm != null && tempconfirm.length > 0) {
					return true;
				}

				if (document.readyState != 'loading' && document.readyState != 'interactive') {
					deferWait(sendToInside, function () {
						var tempconfirm = orderConfirmProcess();
						if (tempconfirm != null && tempconfirm.length > 0) {
							return true;
						}

						return false;
					});

					return true;
				}
			});
		}
		else {
			deferWait(sendToInside, function () {
				if (document.readyState != 'loading') {
					keepWait(_insideViewUpdate, function () {
						if (!_insideFirstLoad)
							return false;

						if (typeof (_insideGraph) != "undefined" && _insideGraph != null) {
							// var temporderdata = getOrderData();

							// if (temporderdata != null && temporderdata.length > 0) {
							// 	for (var i = 0; i < temporderdata.length; i++) {
							// 		if (temporderdata[i].action == "trackOrder") {
							// 			if (insideOrderTotal != temporderdata[i].orderTotal) {
							// 				return true;
							// 			}
							// 		}
							// 	}
							// }
							// else if (insideOrderTotal > 0) {
							// 	insideOrderTotal = 0;
							// 	return true;
							// }

							try {
								var tempcurview = getViewData();

								if (_insideCurUrl != window.location.href) {
									_insideCurUrl = window.location.href;
									_insideCurPageType = tempcurview.type;
									return true;
								}

								if (_insideCurPageType != tempcurview.type) {
									_insideCurPageType = tempcurview.type;
									_insideCurUrl = window.location.href;
									return true;
								}
							} catch (tempex) { }
						}

						return false;
					});

					// Not working right now because order details is in iFrame and inaccessible
					// keepWait(sendToInside, function () {
					// 	if (!_insideFirstLoad)
					// 		return false;

					// 	if (typeof (_insideGraph) != "undefined" && _insideGraph != null) {
					// 		var tempcheckout = _insideJQ("body.ge-checkout-body");
					// 		if (tempcheckout.length > 0) {
					// 			if (!checkoutOpen) {
					// 				checkoutOpen = true;
					// 				_insideJQ.getJSON('/cart.js', function (cart, textStatus) {
					// 					try {
					// 						_insideCart = cart;
					// 					} catch (tempex) { }
					// 				});

					// 				return true;
					// 			}
					// 			else if (!checkoutPurchaseDone) {
					// 				var tempconfirms = orderConfirmProcess();
					// 				if (tempconfirms != null && tempconfirms.length > 0) {
					// 					checkoutPurchaseDone = true;
					// 					return true;
					// 				}
					// 			}
					// 		}
					// 		else if (checkoutOpen) {
					// 			checkoutOpen = false;
					// 			return true;
					// 		}
					// 	}

					// 	return false;
					// });

					return true;
				}

				return false;
			});
		}
	}

	if (window.location.href.indexOf("no_insidechat=true") != -1) {
		return;
	}
	else {
		if (typeof (_insideGraph) != "undefined" && _insideGraph != null && typeof (_insideGraph.current) != "undefined" && _insideGraph.current != null) {
			processInside(_insideGraph.current)
		}
		else {

			var insideTracker = {
				"action": "getTracker",
				"crossDomain": false,
				"account": accountKey
			};

			try {
				let tempHostName = window.location.host.toLowerCase();
				if (tempHostName.indexOf("hellomolly.com.au") != -1) {
					subsiteId = "1";
				}
				else if (tempHostName.indexOf("hellomolly.co.nz") != -1) {
					subsiteId = "3";
				}
				else if (tempHostName.indexOf("hellomolly.co.uk") != -1) {
					subsiteId = "4";
				}
				else if (tempHostName.indexOf("hellomolly.com") != -1) {
					subsiteId = "2";
				}
			} catch (tempex) { }

			if (typeof (subsiteId) != "undefined" && subsiteId != null)
				insideTracker["subsiteId"] = subsiteId;

			_inside.push(insideTracker);

			_inside.push({
				"action": "bind",
				"name": "onload",
				"callback": function (tracker) {
					if (_insideFirstLoad)
						return;

					_insideJQ = _insideGraph.jQuery;

					processInside(tracker);
				}
			});
			(function (w, d, s, u) {
				a = d.createElement(s), m = d.getElementsByTagName(s)[0];
				a.async = 1;
				a.src = u;
				m.parentNode.insertBefore(a, m);
			})(window, document, "script", "//" + trackerURL + "/ig.js");
		}
	}

})();