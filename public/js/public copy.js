if ($('.nav-link')) {
    let href = $('.breadcrumb-item:nth-of-type(2) a').attr('href') || location.pathname
    $(`.nav-link[href='${href}']`).parent().addClass('active')
}

if ($('.badge')) {
    $('.badge').each(function () {
        $(this).addClass('badge-' + ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'][Math.ceil((Math.random() * 6))])
    })
}

if ($('[data-toggle="popover"]').length) {
    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover'
    })
}

if ($('#editor').length) {
    ClassicEditor
        .create(document.querySelector('#editor'), {
            language: 'zh-cn',
            ckfinder: {
                uploadUrl: '/admin/article/ckeditor'
            }
        })
        .catch(error => {
            console.error(error);
        });
}

if ($('[type="file"]').length) {
    $('[type="file"]').next('label').css('cursor', 'pointer')
    $('[type="file"]').change(function (e) {
        var url = window.URL.createObjectURL(e.target.files[0]);
        $(this).next('label').find('img').attr('src', url)
    })
}

if ($('.dbcedit').length) {
    $('.dbcedit').parent().dblclick(function () {
        $(this).find('.dbcedit').removeAttr('disabled').removeClass('border-0').select()
    })
    $('.dbcedit').blur(function () {
        $(this).attr('disabled', 'disabled').addClass('border-0')
    })
}

if ($('.delimg').length) {
    $('.delimg').click(function () {
        let img = $(this).prev('img')
        img.attr('src', 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1708c839610%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1708c839610%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2272.5%22%20y%3D%22104.5%22%3E%E7%82%B9%E5%87%BB%E4%B8%8A%E4%BC%A0%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')
    })
}

if ($('.badge').length) {
    $('.badge').each(function () {
        $(this).addClass('badge-' + ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'][Math.ceil((Math.random() * 6))])
    })
}

if ($('.list-group-item').length) {
    let href = location.pathname
    console.log(href)
    $(`.list-group-item a[href='${href}']`).parent().addClass('active')
}


/**
 * 提示框
 * @param {标题} title 
 * @param {内容} message 
 */
function showToasts(title, message) {
    if ($('.toasts').length === 0) {
        $('body').append($('<div class="toasts"></div>'))
    }
    let toasts = $(`<div class="toast position-relative"><div class="toast-header"><strong class="mr-auto">${title}</strong><button type="button" class="ml-2 mb-1 close" data-dismiss="toast"><span aria-hidden="true">&times;</span></button></div><div class="toast-body">${message}</div></div>`)
    $('.toasts').append(toasts)
    $('.toast').toast({
        animation: true,
        autohide: true,
        delay: 5000
    })
    toasts.toast('show')
}