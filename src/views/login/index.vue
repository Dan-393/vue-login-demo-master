<template>
  <div class='login-container'>
    <div class="login-box">
      <ul class='menu-tab'>
        <li v-for="(item) in menuTab" :key="item.id" :class="{'current':item.current}" @click="JumpMenu(item)">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form"  size='small'>
        <el-form-item prop="username" class="item-form">
          <label>用户名</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item  prop="checkPass" class="item-form" v-if="menuTab[1].current"> -->
        <el-form-item  prop="checkPass" class="item-form" v-show="model==='reg'">
          <label>确认密码</label>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="item-form item-buttons">
          <el-button type="primary" @click="submitForm('ruleForm')" class="item-button">提交</el-button>
          <el-button @click="resetForm('ruleForm')" class="item-button">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isUserNameReg, isPassWordReg }from '@/utils/validate'
export default {
  name:'login',
  data(){
    // 用户名的校验
    // 用户名必须是4-10位之间的字母、下划线、@、.，并且不能以数字开头
    var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else if( !isUserNameReg(value) ){
          callback(new Error('用户名格式错误'));
        } 
        else {
          callback();
        }
      };
      // 密码校验
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if( !isPassWordReg(value)){
          callback(new Error('密码为6至16位数字加字母组合'));
        }else {
          callback();
        }
      };
      // 重复密码校验
      // 如果是在登录模块，这个重复密码不填，无法登录，因此需要忽略他的校验
      var validatePass2 = (rule, value, callback) => {
        if(this.model === 'login'){ callback(); }
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      model:'login',
      menuTab:[
        // current当前选项的被选中，则改变current的背景色
        {txt:'登录',current:true,model:'login'},
        {txt:'注册',current:false,model:'reg'}
      ],
      ruleForm: {
          username: '',
          pass: '',
          age: ''
        },
        rules: {
          username: [
            // trigger: 'blur',失去焦点的时候会触发
            { validator: validateUserName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
    }
  },
  created(){},
  mounted(){},
  methods:{
    JumpMenu(data){
      this.model = data.model
      this.menuTab.forEach(
        (elem)=>{
          // 清空数据中的current默认值（即登录默认为true,若跳转到注册，需要将current改为false
          elem.current=false
        }
      )
      // 点击高亮
      data.current = true;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}

</script>
<style lang="scss" scoped>
  .login-container {
    width: 100%;
    height: 100vh;
    background-image: url('~@/assets/login_img/login_bg_img.jpg');
		background-color: #b8e5f8;
		background-size: cover;
		overflow: auto;
  }
    .login-box {
      margin: 0px auto;
      margin-top: 20vh;	
      width: 24%;
    }
     .menu-tab {
       text-align: center;
      
       li {
         display: inline-block;
         color:#fff;
         font-size: 14px;
         width: 88px;
         line-height: 36px;
         height: 36px;
         border-radius: 2px;
         background-color: rgba(0,0,0,.1);
         cursor: pointer;
      } 
      .current{
            background-color:#204c72;
        }
     }
    .login-form{
      margin-top: 30px;
        label {
        color:rgb(229, 234, 253);
        display: block;
        font-size: 14px;
        font-weight: bold
      }
      .item-form {
        margin-bottom: 25px;
      }
      .item-buttons {
        text-align: center;
        margin-top: 45px;
      }
     
      .item-button {
        display: inline-block;
        margin-left: 30px
      }
      
    }
      
</style>