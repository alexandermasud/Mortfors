

$(document).ready(function(){ 
    
   
    
    $("#myTable").tablesorter( {sortList: [[0,0], [1,0]]} ); 
    
    
    $(".alert").alert()


    $('#formModal').on('show.bs.modal', function(e) {

        var avgangsidId = $(e.relatedTarget).data('avgangsid-id');
        $(e.currentTarget).find('input[name="avgangsid"]').val(avgangsidId);

        var orgplatserId = $(e.relatedTarget).data('orgplatser-id');
        $(e.currentTarget).find('input[name="orgplatser"]').val(orgplatserId);

        var avgangslandId = $(e.relatedTarget).data('avgangsland-id');
        $(e.currentTarget).find('input[name="avgangsland"]').val(avgangslandId);

        var ankomstlandId = $(e.relatedTarget).data('ankomstland-id');
        $(e.currentTarget).find('input[name="ankomstland"]').val(ankomstlandId);

        var avgangsstadId = $(e.relatedTarget).data('avgangsstad-id');
        $(e.currentTarget).find('input[name="avgangsstad"]').val(avgangsstadId);

        var ankomststadId = $(e.relatedTarget).data('ankomststad-id');
        $(e.currentTarget).find('input[name="ankomststad"]').val(ankomststadId);

        var avgangId = $(e.relatedTarget).data('avgang-id');
        $(e.currentTarget).find('input[name="avgang"]').val(avgangId);

        var ankomstId = $(e.relatedTarget).data('ankomst-id');
        $(e.currentTarget).find('input[name="ankomst"]').val(ankomstId);

        var prisId = $(e.relatedTarget).data('pris-id');
        $(e.currentTarget).find('input[name="pris"]').val(prisId);
        
       

        
        
         $('#koptaplatser').ready(function(){
            var pris = parseFloat($('#pris').val()) || 0;
            var koptaplatser = parseFloat($('#koptaplatser').val()) || 0;
            $('#totalt').val(pris * koptaplatser);
            });
        
        
        $('#koptaplatser').change(function(){
            var pris = parseFloat($('#pris').val()) || 0;
            var koptaplatser = parseFloat($('#koptaplatser').val()) || 0;
            $('#totalt').val(pris * koptaplatser);
            });
        
      
    });
    
}); 
    