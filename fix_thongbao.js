const fs = require('fs');
let content = fs.readFileSync('khachhang/thongbao.html', 'utf8');

const search = `          var statusText = statusLabels[o.status] || o.status;
          var isActive = o.status === 'IN_PROGRESS' || o.status === 'SEARCHING' || o.status === 'ACCEPTED';
          notifs.push({
            type: 'order', icon: 'local_shipping', iconBg: 'bg-primary-container', iconText: 'text-on-primary',
            title: svcName, body: 'Đơn hàng ' + (o.order_code || ('#' + o.order_id)) + ' ' + statusText + '.',
            time: o.updated_at || o.created_at, unread: (isActive && readNotifs.indexOf('order_' + o.order_id) < 0), id: 'order_' + o.order_id,
            link: 'theodoidon.html?orderId=' + o.order_id
          });`.replace(/\r\n/g, '\n');

const replace = `          var statusText = statusLabels[o.status] || o.status;
          var isActive = o.status === 'IN_PROGRESS' || o.status === 'SEARCHING' || o.status === 'ACCEPTED' || o.status === 'COMPLETED';
          var linkUrl = o.status === 'COMPLETED' ? 'danhgiatasker.html?orderId=' + o.order_id : 'theodoidon.html?orderId=' + o.order_id;
          var bodyText = o.status === 'COMPLETED' 
              ? 'Đơn hàng ' + (o.order_code || ('#' + o.order_id)) + ' đã hoàn thành. Nhấn để đánh giá Tasker nhé!'
              : 'Đơn hàng ' + (o.order_code || ('#' + o.order_id)) + ' ' + statusText + '.';
              
          notifs.push({
            type: 'order', icon: 'local_shipping', iconBg: 'bg-primary-container', iconText: 'text-on-primary',
            title: svcName, body: bodyText,
            time: o.updated_at || o.created_at, unread: (isActive && readNotifs.indexOf('order_' + o.order_id) < 0), id: 'order_' + o.order_id,
            link: linkUrl
          });`.replace(/\r\n/g, '\n');

if (content.replace(/\r\n/g, '\n').includes(search)) {
    content = content.replace(/\r\n/g, '\n').replace(search, replace);
    fs.writeFileSync('khachhang/thongbao.html', content);
    console.log('Replaced thongbao.html');
} else {
    console.log('Not found');
}
