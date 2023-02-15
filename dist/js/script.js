const app = Vue.createApp({
  data() {
    return {
      noResult: false,
      stores: ['台北', '台中', '台南'],
      payments: ['digital payment', 'ATM'],
      awards: [
        {
          oneWord: 'B',
          color: 'green',
          quantity: 'ONE',
          detail: 'range hood',
        },
        {
          oneWord: 'A',
          color: 'green',
          quantity: 'ONE',
          detail: 'dehumidifier',
        },
        {
          oneWord: 'C',
          color: 'green',
          quantity: 'ONE',
          detail: 'vacuum cleaner',
        },
        {
          oneWord: 'D',
          color: 'blue',
          quantity: 'ONE',
          detail: 'toaster',
        },
        {
          oneWord: 'E',
          color: 'blue',
          quantity: 'ONE',
          detail: 'scale',
        },
        {
          oneWord: 'F',
          color: 'blue',
          quantity: 'ONE',
          detail: 'straightening iron',
        },
        {
          oneWord: 'G',
          color: 'blue',
          quantity: 'FIVE',
          detail: 'vacuum cleaner',
        },
        {
          oneWord: 'H',
          color: 'blue',
          quantity: 'TEN',
          detail: 'rice cooker',
        },
      ],
      inputStore: '',
      inputName: '',
      inputPhone: '',
      inputAmount: '',
      inputPayment: 'digital payment',
      hintStore: '',
      hintName: '',
      hintPhone: '',
      hintAmount: '',
      hintPayment: '',
      submitBtnStatus: 'submit',
    };
  },
  methods: {
    scrolltoForm() {
      this.$refs.form.scrollIntoView({
        behavior: 'smooth',
      });
    },
    ifnoStore() {
      if (this.inputStore !== '') {
        // console.log(this.inputStore);
        this.noResult = true;
        this.stores.forEach(s => {
          if (s.includes(this.inputStore)) {
            // console.log('有此項目');
            this.noResult = false;
          }
        });
      }
      // 當store輸入欄位是空白時，一樣不顯示no result
      else this.noResult = false;
    },
    blurStore() {
      // 如果inputStore為空值，提示store required
      if (this.inputStore === '') this.hintStore = 'required';
      // 如果inputStore的值沒有包含在this.stores中，提示store wrong format
      else if (!this.stores.includes(this.inputStore))
        this.hintStore = 'wrong format';
      // 如果都符合，就不用提示
      else this.hintStore = '';
    },
    blurName() {
      const namePattern = /^([\u4e00-\u9fa5]+|[A-Za-z]+)$/;

      // 如果inputName為空值，提示name required
      if (this.inputName === '') this.hintName = 'required';
      // 如果inputName格式不正確，提示name wrong format
      else if (!namePattern.test(this.inputName))
        this.hintName = 'wrong format';
      // 如果都符合，就不用提示
      else this.hintName = '';
    },
    blurPhone() {
      const phonePattern = /^09\d{8}$/;

      // 如果inputPhone為空值，提示phone required
      if (this.inputPhone === '') this.hintPhone = 'required';
      // 如果inputPhone為格式不正確，提示phone wrong format
      else if (!phonePattern.test(this.inputPhone))
        this.hintPhone = 'wrong format';
      else this.hintPhone = '';
    },
    blurAmount() {
      const amountPattern = /^\d+$/;

      // 如果inputAmount為空值，提示amount required
      if (this.inputAmount === '') this.hintAmount = 'required';
      // 如果inputAmount為格式不正確，提示amount wrong format
      else if (!amountPattern.test(this.inputAmount))
        this.hintAmount = 'wrong format';
      else this.hintAmount = '';
    },
    blurPayment() {
      console.log('payment blur!');
      // 如果inputPayment為空值，提示payment required
      if (this.inputPayment === '') this.hintPayment = 'required';
      // 如果inputPayment的值沒有在payments的array中，提示payment wrong format
      else if (!this.payments.includes(this.inputPayment))
        this.hintPayment = 'wrong format';
      else this.hintPayment = '';
    },
    checkName() {
      const value = this.inputName;
      const pattern = /^([\u4e00-\u9fa5]+|[A-Za-z]+)$/;

      if (!pattern.test(value)) {
        this.inputName = value.slice(0, -1);
      }
    },
    checkNumber(item) {
      const pattern = /^\d+$/;
      const value = this[`${item}`];

      if (!pattern.test(value)) {
        // console.log('delete!');
        this[`${item}`] = value.slice(0, -1);
      }
    },
    submit() {
      // console.log(this.inputPayment);

      const namePattern = /^([\u4e00-\u9fa5]+|[A-Za-z]+)$/;
      const phonePattern = /^09\d{8}$/;
      const amountPattern = /^\d+$/;

      let str = '';

      if (
        this.inputStore === '' ||
        !this.stores.includes(this.inputStore) ||
        this.inputName === '' ||
        !namePattern.test(this.inputName) ||
        this.inputPhone === '' ||
        !phonePattern.test(this.inputPhone) ||
        this.inputAmount === '' ||
        !amountPattern.test(this.inputAmount) ||
        this.inputPayment === '' ||
        !this.payments.includes(this.inputPayment)
      )
        this.submitBtnStatus = 'failure';
      else this.submitBtnStatus = 'success';
      /*
        if (this.inputStore === '')
          // 如果inputStore為空值，提示store required
          str += str === '' ? 'store required' : '\nstore required';
        // 如果inputStore的值沒有包含在this.store中，提示store wrong format
        else if (!this.stores.includes(this.inputStore))
          str += str === '' ? 'store wrong format' : '\nstore wrong format';

      // 如果inputName為空值，提示name required
      if (this.inputName === '')
        str += str === '' ? 'name required' : '\nname required';
      // 如果inputName格式不正確，提示name wrong format
      else if (!namePattern.test(this.inputName))
        str += str === '' ? 'name wrong format' : '\nname wrong format';

      // 如果inputPhone為空值，提示phone required
      if (this.inputPhone === '')
        str += str === '' ? 'phone required' : '\nphone required';
      // 如果inputPhone為格式不正確，提示phone wrong format
      else if (!phonePattern.test(this.inputPhone))
        str += str === '' ? 'phone wrong format' : '\nphone wrong format';

      // 如果inputAmount為空值，提示amount required
      if (this.inputAmount === '')
        str += str === '' ? 'amount required' : '\namount required';
      else if (!amountPattern.test(this.inputAmount))
        str += str === '' ? 'amount wrong format' : '\namount wrong format';

      if (this.inputPayment === '')
        str += str === '' ? 'payment required' : '\npayment required';
        */
      // alert(str);
    },
  },
  mounted() {},
});

app.mount('#app');
