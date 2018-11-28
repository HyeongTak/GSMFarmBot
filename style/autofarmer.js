var plantSrc = "img/empty.png";
            var plantName = "show";
    
            function formatLog(time1, time2){
                var t2 = time2.getTime();
                var t1 = time1.getTime();
                var time = parseInt((t2-t1)/1000);
                if(time < 5){
                    return '방금';
                }
                if(time < 60){
                    return '약 '+time.toString()+'초전'
                }
                time = parseInt(time/60)
                if(time < 60){
                    return '약 '+time.toString()+'분전';
                }
                time = parseInt(time/60)
                if(time < 24){
                    return '약 '+time.toString()+'시간전';
                }
                time = parseInt(time/24)
                return '약 '+time.toString()+'일전';
            }

            function setOTime(){
                <%for(var i=0;i<5;i++){%>
                    document.getElementById("OTime<%=i%>").innerHTML = formatLog(new Date("<%=Log[Log.length-i-1].time%>"), new Date());
                <%}%>
            }
            function formatDate(date){
                var y = date.getFullYear();
                var m = date.getMonth();
                var d = date.getDate();
                var h = date.getHours();
                var min = date.getMinutes();
                var s = date.getSeconds();
                return y+'-'+m+'-'+d+' '+h+'시'+min+'분'+s+'초';
            }

            function formatTime(min){
              var t = min/60;
              var m = min%60;
              if(m == 0){
                return t.toString()+'시간';
              }else{
                return t.toString()+'시간 '+ m.toString()+'분';
              }
            }            
            function changePlant(p){
            plantName = p;
                if(p == "carrot"){
                    plantSrc = "img/carrot.png";
                }
                if(p == "tomato"){
                    plantSrc = "img/tomato.png";
                }
                if(p == "eraser"){
                    plantSrc = "img/empty.png";
                }
                if(p == "show"){
                    document.getElementById('plantBtn').style.display="none";
                }
            }
            function showBtn(){
            document.getElementById('plantBtn').style.display="block";
            }
            function changePlantSet(plantId, imgId){
            $.ajax({
                type: 'GET',
                url: '/api/findName',
                data: { plantId: plantId }
            })
            .done(function(result){
                if(result == "carrot"){
                plantSrc = "img/carrot.png";
                }
                if(result == "tomato"){
                plantSrc = "img/tomato.png";
                }
                var img = document.getElementById(imgId);
                img.src = plantSrc;
            })
            .fail(function(xhr, status, errorThrown) {
                console.log('오류');
            })
            .always(function(xhr, status) {
                console.log('요청 완료')
            });
            }

            function watering(plantId, imgId){
            if(plantId){
                $.post("/water", {
                x : imgId[4],
                y : imgId[3]
                }).done();

                $.post("/updateMap", {
                x : imgId[4],
                y : imgId[3]
                }).done();

                $.post("/addLog",{
                    act : "물 주기 ["+imgId[4]+","+imgId[3]+"]"
                }).done();
            }else{
                alert('심겨진 식물이 없습니다.');
            }
            }

            function showInfo(plantId, imgId){
            if(plantId){
                $.ajax({
                type: 'GET',
                url: '/api/findInfo',
                data: { plantId: plantId, x: imgId[4], y:imgId[3] }
                })
                .done(function(result){
                document.getElementById('pName').innerHTML = '식물 이름: '+result[0];
                document.getElementById('pCycle').innerHTML = '물 주는 주기: '+formatTime(result[1]);
                document.getElementById('pDate').innerHTML = '심은 날짜: '+formatDate(new Date(result[2]));
                document.getElementById('pRDate').innerHTML = '최근 물준 시간: '+formatDate(new Date(result[3]));
                //var img = document.getElementById(imgId);
                //img.src = plantSrc;
                })
                .fail(function(xhr, status, errorThrown) {
                console.log('오류');
                })
                .always(function(xhr, status) {
                console.log('요청 완료')
                });
            }else{
                document.getElementById('pName').innerHTML = '정보 없음';
                document.getElementById('pCycle').innerHTML = '';
                document.getElementById('pDate').innerHTML = '';
                document.getElementById('pRDate').innerHTML = '';
            }
            }
            
            function addPlant(plantId, imgId){
                if(plantName == "show"){
                    showInfo(plantId, imgId);
                }else if(plantName == "water"){
                    watering(plantId, imgId);
                }else if(!(plantName == "eraser")){
                    var img = document.getElementById(imgId);
                        img.src = plantSrc;
                        $.post("/addMap", { 
                        plantName: plantName,
                        x : imgId[4],
                        y : imgId[3]
                        }).done();
                        $.post("/addLog",{
                        act : "씨앗 심기"+"("+plantName+")"+" ["+imgId[4]+","+imgId[3]+"]"
                        }).done();
                        
                }
            }
            function settingPlant(){
            <% for(var i=0;i<8;i++){%>
                <% for(var j=0;j<5;j++){%>
                <%if(plantArr[i][j]){%>changePlantSet("<%=plantArr[i][j]%>","img<%=i%><%=j%>");<%}%>
                <%}%>
            <%}%>
            }
            function removePlant(plantId,imgId){
            if(plantName == "show"){
                showInfo(plantId, imgId);
            }else if(plantName == "water"){
                watering(plantId, imgId);
            }else if(plantName == "eraser"){
                if(confirm('이미 심어진 식물입니다. 정말 삭제하시겠습니까?')){
                $.post("/delete", {
                    x : imgId[4],
                    y : imgId[3]
                }).done();
                $.post("/addLog",{
                        act : "식물 제거"+" ["+imgId[4]+","+imgId[3]+"]"
                        }).done();
                var img = document.getElementById(imgId);
                img.src = plantSrc;
                }
            }
            }