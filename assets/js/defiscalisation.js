function buildDeduction(left, middle, right) {
    return [{
        'amount-left-bottom': left['lb'],
        'amount-center': left['c'],
        'amount-right-top': left['rt']
    }, {
        'amount-left-bottom': middle['lb'],
        'amount-center': middle['c'],
        'amount-right-top': middle['rt']
    }, {
        'amount-left-bottom': right['lb'],
        'amount-center': right['c'],
        'amount-right-top': right['rt']
    }];
}

$(document).ready(function() {
    //ACTIVATE TOOLTIP
    $('.defiscalisation [data-toggle="tooltip"]').tooltip({trigger: 'manual'});

    //init
    $('.don-type-item').first().tooltip('show');
    $($('.don-type-item').first().data('target')).show();

    // c = center
    // lb = left bottom
    // rt = right top

    const deductionValues = {
        '#don-type-ifi': buildDeduction(
            {c: '1 000€', lb: '750€', rt: '250€'},
            {c: '5 000€', lb: '750€', rt: '1 000€'},
            {c: '10 000€', lb: '7 500€', rt: '2 500€'}),
        '#don-type-ir': buildDeduction(
            {c: '150€', lb: '99€', rt: '51€'},
            {c: '500€', lb: '330€', rt: '170€'},
            {c: '1 000€', lb: '660€', rt: '340€'}),
        '#don-type-is': buildDeduction(
            {c: '10 000€', lb: '6 000€', rt: '4 000€'},
            {c: '20 000€', lb: '12 000€', rt: '8 000€'},
            {c: '30 000€', lb: '18 000€', rt: '12 000€'}),
    };

    $('.don-type-item').hover(function() {
        $(this).siblings('.don-type-item').removeClass('active');
        $(this).addClass('active');
        
        $(this).tooltip('show');
        $(this).siblings('.don-type-item').tooltip('hide');
        
        const target = $(this).data('target');

        $(target).siblings('.don-type-content').hide();
        $(target).show();

        //Modify deduction amounts
        // target = #don-type-ifi | #don-type-ir | #don-type-is
        if (!deductionValues[target]) {
            return ;
        }

        const newAmounts = deductionValues[target];
        
        modifyCircleValues(newAmounts);

    }, function() {

    });

    function modifyCircleValue(circle, amounts) {
        $(circle).find('.amount-left-bottom').text(amounts['amount-left-bottom']);
        $(circle).find('.amount-center').text(amounts['amount-center']);
        $(circle).find('.amount-right-top').text(amounts['amount-right-top']);
    }

    function modifyCircleValues(amounts) {
        if (Array.isArray(amounts) === false || amounts.length !== 3)
            return;

        modifyCircleValue('.circle-left', amounts[0]);
        modifyCircleValue('.circle-middle', amounts[1]);
        modifyCircleValue('.circle-right', amounts[2]);
    }
});