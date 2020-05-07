// import Vue from 'vue'
// import Vuex from 'vuex'

Vue.use(Vuex);

const store=new Vuex.Store({
      state:{
          count:1,
          message:"",
          couponnum:''
      },
    getters:{
        getStateCount:function (state) {
            return state.count+1;
        }
    },
    mutations:{
          add(state,m){
               state.count=state.count+1;
              //state.count=5;
              state.message=m;
          },
          reduction(state,n){
              state.count=state.count-n;
          },
          count(state,num){
              state.couponnum=num;
          }
    },
    actions:{
          addFun(context,m){
              context.commit("add",m)
          },
          countcp(context,num){
             context.commit("count",num)
          },
          reductionFun(context,n){
              context.commit("reduction",n)
          }
    }
})

export default store
