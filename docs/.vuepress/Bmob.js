import axios from 'axios';
import website from './website'
export default (() => {
  let Bmob = {};
  const url = website.API
  let ak, sk;
  Bmob.initialize = function (AK, SK) {
    ak = AK;
    sk = SK;
  }
  Bmob.login = function (user, passwd) {
    return new Promise((resolve, reject) => {
      if (user == 'smallwei' && passwd == 'smallweio0') {
        resolve()
      } else {
        reject()
      }
    })
  }
  Bmob.Query = function (val) {
    this.table = val;
    this.init = () => {
      this.form = {};
      this.query = {}
      this.params = []
      this.limit = [0, 9999]
      this.order = []
      this.count = false
      this.sum = [];
    }
    this.init()

    const safe = this;
    this.query.equalTo = (keys, equal, value) => {
      this.params.push([keys, equal, value])
    }
    this.query.skip = (val) => {
      this.limit[0] = val
    }
    this.query.limit = (val) => {
      this.limit[1] = val
    }
    this.query.order = function () {
      let params = []
      for (let o in arguments) {
        params.push(arguments[o])
      }
      safe.order = params;
    }
    this.query.statTo = (type, prop) => {
      this.sum = [type, prop];
    }
    this.query.set = (key, value) => {
      this.form[key] = value
    }
    this.login = (userName, passWord) => {
      return new Promise((resolve, reject) => {
        if (userName == 'smallwei' && passWord == 'smallweio0') {
          resolve()
        } else {
          reject()
        }
      })
    }
    this.query.save = () => {
      return axios({
        url: url + '/bmob/save',
        method: 'post',
        data: {
          form: this.form,
          id: this.form.id,
          table: this.table
        }
      })
    }
    this.query.destroy = (id) => {
      return axios({
        url: url + '/bmob/del',
        method: 'post',
        data: {
          id: id,
          table: this.table
        }
      })
    }
    this.query.find = (count = false) => {
      this.count = count;
      return new Promise((resolve, reject) => {
        axios({
          url: url + '/bmob/list',
          method: 'post',
          data: {
            sum: this.sum,
            count: this.count,
            table: this.table,
            params: this.params,
            limit: this.limit,
            order: this.order
          }
        }).then(res => {
          this.init()
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }

    this.query.count = () => {
      return this.query.find(true)
    }
    return this.query
  }
  return Bmob
})()