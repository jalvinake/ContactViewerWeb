var _contacts = {}
var _contactid = null;

var _apiKey = 'totally'
var _restUrl = 'http://contacts.tinyapollo.com/contacts?key=' + _apiKey


$(document).on('pagebeforeshow','#home-page', function(){
	var contactList = $('#contactlist')
	$.get(_restUrl,
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

  newContactData = function() {
    return {
      name: $('#contact-name-edit').val(),
      phone: $('#contact-phone-edit').val(),
      title: $('#contact-title-edit').val(),
      twitterId: $('#contact-twitter-edit').val(),
      email: $('#contact-email-edit').val()
    };
  };
  
$(document).on('pagebeforeshow','#edit-page', function(){
	if(_contactid != null) {
		var contact = _contacts[_contactid]
		$('#contact-name-edit').val(contact.name)
		$('#contact-phone-edit').val(contact.phone)
		$('#contact-title-edit').val(contact.title)
		$('#contact-twitter-edit').val(contact.twitterId)
		$('#contact-email-edit').val(contact.email)
	}
	
})

  
$(document).on('click','#save-button', function(){
    var data, item;  
    data = newContactData();
      console.log(data)
      $.ajax({
	type: "POST",
	url: _restUrl,
	data: data,
	success: function(data) {
        if (data.status === 'success') {
          return true;
        } else {
          return alert(data.message);
        }},
	dataType: 'json'
      });
    });


