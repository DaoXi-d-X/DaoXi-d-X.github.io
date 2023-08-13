<?php
 class ImgBridge{
    private $water='';
    private $imgUrl=''; 
    private $referer='';
    private $ua='MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
    private $imgCode='';
    private $imgHeader='';
    private $imgBody='';
    private $imgType='';
 
    public function \_\_construct($config=array()){
        foreach($config as $key=>$value){
            $this->$key=$value;
        }
    }
     
    public function getImg($imgUrl){
        $this->imgUrl=$imgUrl;
        /\*\* 处理url \*/
        if(substr($this->imgUrl,0,7)!=='http://' && substr($this->imgUrl,0,8)!=='https://'){
            $this->imgUrl='http://'.$this->imgUrl;
        }
        /\*\* 解析url中的host \*/
        $url\_array=parse\_url($this->imgUrl);
        /\*\* 设置referer \*/
        $this->referer=$this->referer==""?'http://'.$url\_array\['host'\]:$this->referer;
        /\*\*开始获取 \*/
        $this->urlOpen();
        $this->imgBody;
        /\*\*处理错误 \*/
        if($this->imgCode!=200){
            $this->error(1);
            exit();
        }
         
        /\*\*获取图片格式 \*/
        preg\_match("/Content-Type: image\\/(.+?)\\n/sim",$this->imgHeader,$result);
        /\*\*看看是不是图片 \*/
        if(!isset($result\[1\])){
            $this->error(2);
            exit();
        }else{
            $this->imgType=$result\[1\];
        }
        /\*\* 输出内容 \*/
        $this->out();        
    }
    private function out(){
        /\*\* gif 不处理，直接出图 \*/
        if($this->imgType=='gif'){
            header("Content-Type: image/gif");
            echo $this->imgBody;
            exit();
        }
        header("Content-Type: image/png");
        /\*\* 其他类型的，加水印 \*/
        $im=imagecreatefromstring($this->imgBody);
        $white = imagecolorallocate($im, 255, 255, 255);
        /\*加上水印\*/
        if($this->water){
            imagettftext($im, 12, 0, 20, 20, $white, "/fonts/hwxh.ttf", $this->water);            
        }
        imagepng($im);
         
    }
    private function error($err){
        header("Content-Type: image/jpeg");
        $im=imagecreatefromstring(file\_get\_contents('./default.jpg'));
        imagejpeg($im);
    }
 
    private function urlOpen()
    {
        $ch = curl\_init();
        curl\_setopt($ch, CURLOPT\_URL, $this->imgUrl);
        curl\_setopt($ch, CURLOPT\_USERAGENT, $this->ua);
        curl\_setopt ($ch,CURLOPT\_REFERER,$this->referer);
        curl\_setopt($ch, CURLOPT\_RETURNTRANSFER, 1);
        curl\_setopt($ch, CURLOPT\_HEADER, 1);
        /\*\*跳转也要 \*/
        curl\_setopt($ch, CURLOPT\_FOLLOWLOCATION, true);
        /\*\*  支持https \*/
        $opt\[CURLOPT\_SSL\_VERIFYHOST\] = 2;
        $opt\[CURLOPT\_SSL\_VERIFYPEER\] = FALSE;
        curl\_setopt\_array($ch, $opt);
        $response = curl\_exec($ch);
        $this->imgCode=curl\_getinfo($ch, CURLINFO\_HTTP\_CODE) ;
        if ($this->imgCode == '200') {
            $headerSize = curl\_getinfo($ch, CURLINFO\_HEADER\_SIZE);
            $this->imgHeader = substr($response, 0, $headerSize);
            $this->imgBody = substr($response, $headerSize);
            return ;
        }
        curl\_close($ch);
    }
 
 }
 
 $img=new ImgBridge(array('water'=>''));
 $img->getImg(strstr($\_SERVER\["QUERY\_STRING"\], "http"));