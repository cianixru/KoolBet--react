// Logo imgs
import reqDeposit from './../../../../../../../view/img/pay_logos/request_deposit.png';
import mtnLogo from './../../../../../../../view/img/pay_logos/mtn-logo.jpg';
import omLogo from './../../../../../../../view/img/pay_logos/om_logo.png';
import ppLogo from './../../../../../../../view/img/pay_logos/pp_logo.png';
import paystack from './../../../../../../../view/img/pay_logos/paystack.png';
import interswitch from './../../../../../../../view/img/pay_logos/interswitch.png';
import reqWithdraw from './../../../../../../../view/img/pay_logos/request_withdraw.png';


export const depositVariants = [
    {
        title: 'Request Deposit',
        system: '',
        src: reqDeposit
    },
    {
        title: 'MTN',
        system: 'MTN',
        src: mtnLogo,
        fields: ['Phone']
    },
    {
        title: 'Orange Money',
        system: 'OrangeMoney',
        src: omLogo,
        fields: ['Phone'],
        beforeInstruction: {
            label: "Dial #150*4*4# on your mobile phone and follow the instructions"
        }
    },
    {
        title: 'PayPal',
        system: '',
        src: ppLogo,
        fields: ['Phone']
    },
    {
        title: 'Paystack',
        system: '',
        src: paystack
    },
    {
        title: 'Interswitch',
        system: '',
        src: interswitch
    },
];

export const withdrawVariants = [

    {
        title: 'Request Withdraw',
        src: reqWithdraw
    },
    {
        title: 'MTN',
        system: 'MTN',
        src: mtnLogo,
        fields: ['Phone'],
        editProfile: false,
        afterInstruction: {
            wait: true,
        }
    },
    {
        title: 'Orange Money',
        src: omLogo,
        system: 'OrangeMoney',
        fields: [],
        editProfile: true,
        afterInstruction: {
            wait: false,
            label: 'Your request has been submitted to your operator.\n' +
                'You will be notified, when money has been sent to your bank account...',
        }
    },

];