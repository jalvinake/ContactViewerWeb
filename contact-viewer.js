var _contacts = {}
var _contactid = null;

var _apiKey = 'totally'

$(document).on('pagebeforeshow','#home-page', function(){
	var contactList = $('#contactlist')
	$.get('http://contacts.tinyapollo.com/contacts?key=' + _apiKey, 
	function(result){
		for(i in result.contacts){
			var contact = result.contacts[i]
			_contacts[contact._id] = contact
			contactList.append('<li><a href="#details-page" data-contact-id="' +contact._id+'"><h3>'+contact.name+'</h3><p>'+contact.title+'</p></a></li>')
		}
		contactList.listview('refresh')
	})
})

$(document).on('click','#contactlist a', function(){
	var link = $(this)
	_contactid = link.data('contact-id')
	return true
})

$(document).on('pagebeforeshow','#details-page', function(){
	var contact = _contacts[_contactid]
	$('.contact-name').text(contact.name)
	$('.contact-phone').text(contact.phone)
	$('.contact-title').text(contact.title)
	$('.contact-twitter').text(contact.twitterId)
	$('.contact-email').text(contact.email)
})

$(document).on('pagebeforeshow','#edit-page', function(){
	
})
