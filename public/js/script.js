$(document).ready(function() {
	$('.delete-trip-button').on('click', function() {
		var id = $(this).data('id-del');
		var url = '/deleteTransaction/' + (id);
		if (confirm('Ta bort resa?')) {
			$.ajax({
				url: url,
				type: 'DELETE',
				success: function(result) {
					console.log('Tar bort resa');
					window.location.href = "/transactions";
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});
	$("#myTable").tablesorter({
		sortList: [
			[0, 0],
			[1, 0]
		]
	});
	$(".alert").alert()
	$('#formModal').on('show.bs.modal', function(e) {
		var avgangsidId = $(e.relatedTarget).data('avgangsid-id');
		$(e.currentTarget).find('input[name="avgangsid"]').val(avgangsidId);
		var orgplatserId = $(e.relatedTarget).data('orgplatser-id');
		$(e.currentTarget).find('input[name="orgplatser"]').val(orgplatserId);
		var avgangslandId = $(e.relatedTarget).data('avgangsland-id');
		$(e.currentTarget).find('input[name="avgangsland"]').val(avgangslandId);
		$('#avgangslandId').text(avgangslandId);
		var ankomstlandId = $(e.relatedTarget).data('ankomstland-id');
		$(e.currentTarget).find('input[name="ankomstland"]').val(ankomstlandId);
		$('#ankomstlandId').text(ankomstlandId);
		var avgangsstadId = $(e.relatedTarget).data('avgangsstad-id');
		$(e.currentTarget).find('input[name="avgangsstad"]').val(avgangsstadId);
		$('#avgangsstadId').text(avgangsstadId);
		var ankomststadId = $(e.relatedTarget).data('ankomststad-id');
		$(e.currentTarget).find('input[name="ankomststad"]').val(ankomststadId);
		$('#ankomststadId').text(ankomststadId);
		var avgangId = $(e.relatedTarget).data('avgang-id');
		$(e.currentTarget).find('input[name="avgang"]').val(avgangId);
		$('#avgangId').text(avgangId);
		var ankomstId = $(e.relatedTarget).data('ankomst-id');
		$(e.currentTarget).find('input[name="ankomst"]').val(ankomstId);
		$('#ankomstId').text(ankomstId);
		var prisId = $(e.relatedTarget).data('pris-id');
		$(e.currentTarget).find('input[name="pris"]').val(prisId);
		$('#prisId').text(prisId);
		$('#koptaplatser').ready(function() {
			var pris = parseFloat($('#pris').val()) || 0;
			var koptaplatser = parseFloat($('#koptaplatser').val()) || 0;
			$('#totalt').val(pris * koptaplatser);
			$('#totalt-h2').text(pris * koptaplatser);
		});
		$('#koptaplatser').change(function() {
			var pris = parseFloat($('#pris').val()) || 0;
			var koptaplatser = parseFloat($('#koptaplatser').val()) || 0;
			$('#totalt').val(pris * koptaplatser);
			$('#totalt-h2').text(pris * koptaplatser);
		});
	});
});
$(function() {
	$('[data-toggle="popover"]').popover()
})