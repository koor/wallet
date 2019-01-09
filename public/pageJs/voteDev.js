 angularApp.controller('myCtrl', function($scope, $http) { 
     $scope.gasPrice = 0;
     $scope.balance = 0;
     $scope.minValidators = 1;
     $scope.minDepositAmount = 100000;

     let web3Util = new Web3();     

     $scope.accountList = new Array();

     $scope.RPCUrl = "";

    $scope.getBalance = function(){
        $scope.spin = "myIconSpin";
        web3Util.eth.getBalance($scope.account,(err,result)=>{
            console.log(err,result);
            if(!err){
                $scope.spin = "";
                $scope.balance = web3Util.fromWei(result,"ether");
                $scope.$apply();
            }else{
                swal({title:"RPC Error",text:err.toString(),icon:"error"});
            }
        })
     }

    $scope.getAccountList = function(){
        web3Util.eth.getAccounts((err,result)=>{
            if(!err){
                $scope.accountList = result;
                if(result.length > 0){
                    $scope.account = $scope.accountList[0];  
                    $scope.getBalance();
                }
                $scope.$apply();
            }
        })
     }

     $scope.initWeb3 = function(){
        removePageLoader();
         try{
            web3Util.setProvider(new web3Util.providers.HttpProvider($scope.RPCUrl));
            if(web3Util.isConnected()){
                console.log("connected");
                $scope.getAccountList();
            }else{
                console.log("not connected");
                swal({title:"RPC Connect Error",text:"Not possible to connect to the RPC provider. Make sure the provider is running and a connection is open.",icon:"error",button:"Go To Set RPC"}).then((v)=>{
                    window.location.href = "accountDev.html";
                })
            }
        }catch(e){
            console.log(e);
        }
     }

     $scope.initWeb3();

     $scope.selectAccount = function(){
        $scope.getBalance();
     }

     $scope.voteNextEpoch = function(){
        //num to hex string
        let hexStr = "0x"+decimalToHex(100000);
        console.log(hexStr);

        web3Util.chain.createChildChain({from:""},(err,result)=>{
            
        })
     }

 });
 $(function() {
     menuActive(3);
 });