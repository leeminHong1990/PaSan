<GameFile>
  <PropertyGroup Name="PSGameRoom2DUI" Type="Layer" ID="70837580-0a52-403f-b827-4bdcb664fb24" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="18" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="bg_panel" ActionTag="956068045" Tag="6036" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="422" RightEage="422" TopEage="237" BottomEage="237" Scale9OriginX="-422" Scale9OriginY="-237" Scale9Width="844" Scale9Height="474" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="26" G="26" B="26" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="sum_score_panel" ActionTag="-845751923" Tag="649" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="440.0000" RightMargin="440.0000" TopMargin="101.6800" BottomMargin="578.3200" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="400.0000" Y="40.0000" />
            <Children>
              <AbstractNodeData Name="sum_score_img" ActionTag="1470998603" Tag="648" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="82.0000" RightMargin="82.0000" TopMargin="-14.0000" BottomMargin="-14.0000" LeftEage="61" RightEage="61" TopEage="16" BottomEage="16" Scale9OriginX="61" Scale9OriginY="16" Scale9Width="114" Scale9Height="36" ctype="ImageViewObjectData">
                <Size X="236.0000" Y="68.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="20.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.5900" Y="1.7000" />
                <FileData Type="MarkedSubImage" Path="PSGameRoomUI/score_img.png" Plist="PSGameRoomUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="sum_score_label" ActionTag="484156491" Tag="652" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="138.0000" RightMargin="122.0000" TopMargin="12.8000" BottomMargin="-4.8000" IsCustomSize="True" FontSize="35" LabelText="500" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="32.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="208.0000" Y="11.2000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="210" B="0" />
                <PrePosition X="0.5200" Y="0.2800" />
                <PreSize X="0.3500" Y="0.8000" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="598.3200" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.8310" />
            <PreSize X="0.3125" Y="0.0556" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="round_info_panel" ActionTag="-220757042" Tag="12297" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="432.9600" RightMargin="447.0400" TopMargin="31.9520" BottomMargin="638.0480" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="400.0000" Y="50.0000" />
            <Children>
              <AbstractNodeData Name="room_id_label" ActionTag="-1714710002" Tag="12303" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="246.0000" TopMargin="9.0000" BottomMargin="9.0000" IsCustomSize="True" FontSize="23" LabelText="房号:123456" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="152.0000" Y="32.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="2.0000" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0050" Y="0.5000" />
                <PreSize X="0.3800" Y="0.6400" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="round_label" ActionTag="-1658126829" Tag="12304" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="282.3200" RightMargin="-22.3200" TopMargin="9.0000" BottomMargin="9.0000" IsCustomSize="True" FontSize="23" LabelText="局数:   4/8" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="32.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="282.3200" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7058" Y="0.5000" />
                <PreSize X="0.3500" Y="0.6400" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="bout_label" ActionTag="-822139750" Tag="568" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="148.3200" RightMargin="111.6800" TopMargin="9.0000" BottomMargin="9.0000" IsCustomSize="True" FontSize="23" LabelText="轮数: 20/20" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="32.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="148.3200" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3708" Y="0.5000" />
                <PreSize X="0.3500" Y="0.6400" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="table_idx_label" ActionTag="-1025774140" VisibleForFrame="False" Tag="1592" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="428.3200" RightMargin="-168.3199" TopMargin="9.0000" BottomMargin="9.0000" IsCustomSize="True" FontSize="23" LabelText="局数:   4/8" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="32.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="428.3200" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0708" Y="0.5000" />
                <PreSize X="0.3500" Y="0.6400" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="632.9600" Y="663.0480" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4945" Y="0.9209" />
            <PreSize X="0.3125" Y="0.0694" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="game_info_panel" ActionTag="1848235869" VisibleForFrame="False" Tag="173" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="590.0000" RightMargin="590.0000" TopMargin="382.0000" BottomMargin="238.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="100.0000" Y="100.0000" />
            <Children>
              <AbstractNodeData Name="cur_player_panel" ActionTag="-1905160143" Tag="2708" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-8.0000" RightMargin="-8.0000" TopMargin="-8.0000" BottomMargin="-8.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="116.0000" Y="116.0000" />
                <Children>
                  <AbstractNodeData Name="lefttime_bg" ActionTag="-565520609" Tag="1603" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="15.0000" RightMargin="15.0000" TopMargin="13.0000" BottomMargin="13.0000" LeftEage="23" RightEage="23" TopEage="36" BottomEage="36" Scale9OriginX="23" Scale9OriginY="36" Scale9Width="40" Scale9Height="18" ctype="ImageViewObjectData">
                    <Size X="86.0000" Y="90.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="58.0000" Y="58.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.7414" Y="0.7759" />
                    <FileData Type="Normal" Path="GameRoom2DUI/clock_img.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="lefttime_label" ActionTag="-736872694" Tag="1602" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="38.4200" RightMargin="39.5800" TopMargin="50.1200" BottomMargin="33.8800" LabelText="15" ctype="TextBMFontObjectData">
                    <Size X="38.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="57.4200" Y="49.8800" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4950" Y="0.4300" />
                    <PreSize X="0.3276" Y="0.2759" />
                    <LabelBMFontFile_CNB Type="Normal" Path="GameRoom2DUI/number4.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="50.0000" Y="50.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="1.1600" Y="1.1600" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="288.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.4000" />
            <PreSize X="0.0781" Y="0.1389" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel0" ActionTag="-1000996875" Tag="1477" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="321.1840" RightMargin="838.8160" TopMargin="455.6080" BottomMargin="104.3920" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="120.0000" Y="160.0000" />
            <Children>
              <AbstractNodeData Name="player_hand_panel" ActionTag="-375428383" Tag="1515" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="144.0000" RightMargin="-504.0000" TopMargin="-53.2000" BottomMargin="-0.8000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="480.0000" Y="214.0000" />
                <Children>
                  <AbstractNodeData Name="player_tile_panel" ActionTag="403144017" Tag="421" IconVisible="False" RightMargin="280.0000" TopMargin="14.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="200.0000" Y="200.0000" />
                    <Children>
                      <AbstractNodeData Name="poker_panel" ActionTag="1406923651" Tag="584" IconVisible="False" RightMargin="-150.0000" TopMargin="50.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="350.0000" Y="150.0000" />
                        <Children>
                          <AbstractNodeData Name="tile_img_0" ActionTag="-1470226239" Tag="424" IconVisible="False" RightMargin="197.0000" TopMargin="-64.0000" Scale9Width="153" Scale9Height="214" ctype="ImageViewObjectData">
                            <Size X="153.0000" Y="214.0000" />
                            <AnchorPoint />
                            <Position />
                            <Scale ScaleX="0.7000" ScaleY="0.7000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition />
                            <PreSize X="0.4371" Y="1.4267" />
                            <FileData Type="MarkedSubImage" Path="Poker/pic_poker_a1.png" Plist="Poker.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="tile_img_1" ActionTag="109522417" Tag="423" IconVisible="False" LeftMargin="120.0000" RightMargin="77.0000" TopMargin="-64.0000" Scale9Width="153" Scale9Height="214" ctype="ImageViewObjectData">
                            <Size X="153.0000" Y="214.0000" />
                            <AnchorPoint />
                            <Position X="120.0000" />
                            <Scale ScaleX="0.7000" ScaleY="0.7000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.3429" />
                            <PreSize X="0.4371" Y="1.4267" />
                            <FileData Type="MarkedSubImage" Path="Poker/pic_poker_a1.png" Plist="Poker.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="tile_img_2" ActionTag="-1540839557" Tag="422" IconVisible="False" LeftMargin="240.0000" RightMargin="-43.0000" TopMargin="-64.0000" Scale9Width="153" Scale9Height="214" ctype="ImageViewObjectData">
                            <Size X="153.0000" Y="214.0000" />
                            <AnchorPoint />
                            <Position X="240.0000" />
                            <Scale ScaleX="0.7000" ScaleY="0.7000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.6857" />
                            <PreSize X="0.4371" Y="1.4267" />
                            <FileData Type="MarkedSubImage" Path="Poker/pic_poker_a1.png" Plist="Poker.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition />
                        <PreSize X="1.7500" Y="0.7500" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="score_img" ActionTag="-308496787" Tag="622" IconVisible="False" LeftMargin="350.0000" RightMargin="-295.0000" TopMargin="152.0000" BottomMargin="11.0000" LeftEage="59" RightEage="59" TopEage="16" BottomEage="16" Scale9OriginX="59" Scale9OriginY="16" Scale9Width="27" Scale9Height="5" ctype="ImageViewObjectData">
                        <Size X="145.0000" Y="37.0000" />
                        <Children>
                          <AbstractNodeData Name="score_label" ActionTag="-1943426478" Tag="621" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="26.8500" RightMargin="47.1500" TopMargin="2.5000" BottomMargin="2.5000" IsCustomSize="True" FontSize="26" LabelText="1000" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="71.0000" Y="32.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="62.3500" Y="18.5000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="210" B="0" />
                            <PrePosition X="0.4300" Y="0.5000" />
                            <PreSize X="0.4897" Y="0.8649" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="350.0000" Y="11.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="1.7500" Y="0.0550" />
                        <PreSize X="0.7250" Y="0.1850" />
                        <FileData Type="MarkedSubImage" Path="PSGameRoomUI/press_score_img.png" Plist="PSGameRoomUI.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="type_img" ActionTag="-798887472" VisibleForFrame="False" Tag="1315" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="383.0000" RightMargin="-217.0000" TopMargin="63.0000" BottomMargin="63.0000" LeftEage="11" RightEage="11" TopEage="24" BottomEage="24" Scale9OriginX="11" Scale9OriginY="24" Scale9Width="12" Scale9Height="26" ctype="ImageViewObjectData">
                        <Size X="34.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="label" ActionTag="-1774595826" Tag="261" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1.0000" RightMargin="1.0000" TopMargin="4.0000" BottomMargin="4.0000" IsCustomSize="True" FontSize="26" LabelText="对&#xA;子" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="32.0000" Y="66.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="17.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="210" B="0" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9412" Y="0.8919" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="400.0000" Y="100.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="2.0000" Y="0.5000" />
                        <PreSize X="0.1700" Y="0.3700" />
                        <FileData Type="MarkedSubImage" Path="PSGameRoomUI/word_img.png" Plist="PSGameRoomUI.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="break_img" ActionTag="-170793340" VisibleForFrame="False" Tag="234" IconVisible="False" RightMargin="-147.0000" TopMargin="51.0000" LeftEage="47" RightEage="47" TopEage="30" BottomEage="30" Scale9OriginX="47" Scale9OriginY="30" Scale9Width="253" Scale9Height="89" ctype="ImageViewObjectData">
                        <Size X="347.0000" Y="149.0000" />
                        <AnchorPoint />
                        <Position />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition />
                        <PreSize X="1.7350" Y="0.7450" />
                        <FileData Type="Normal" Path="PSGameRoomUI/my_poker_img.png" Plist="" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.4167" Y="0.9346" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="see_btn" ActionTag="-1764888307" Tag="262" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="77.2000" RightMargin="230.8000" TopMargin="117.3800" BottomMargin="44.6200" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="142" Scale9Height="30" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="172.0000" Y="52.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="163.2000" Y="70.6200" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3400" Y="0.3300" />
                    <PreSize X="0.3583" Y="0.2430" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="MarkedSubImage" Path="PSGameRoomUI/see_enable_btn.png" Plist="PSGameRoomUI.plist" />
                    <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/see_btn.png" Plist="PSGameRoomUI.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="stuffy_img" ActionTag="850790939" VisibleForFrame="False" Tag="234" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="77.2000" RightMargin="230.8000" TopMargin="117.3800" BottomMargin="44.6200" LeftEage="56" RightEage="56" TopEage="17" BottomEage="17" Scale9OriginX="56" Scale9OriginY="17" Scale9Width="60" Scale9Height="18" ctype="ImageViewObjectData">
                    <Size X="172.0000" Y="52.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="163.2000" Y="70.6200" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3400" Y="0.3300" />
                    <PreSize X="0.3583" Y="0.2430" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/see_enable_btn.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="144.0000" Y="-0.8000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.2000" Y="-0.0050" />
                <PreSize X="4.0000" Y="1.3375" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="player_info_panel" ActionTag="-1219429273" Tag="1478" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="60.0000" RightMargin="60.0000" TopMargin="80.0000" BottomMargin="80.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <AnchorPoint />
                <Position X="60.0000" Y="80.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
                <FileData Type="Normal" Path="PSPlayerInfoNode.csd" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="381.1840" Y="184.3920" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.2978" Y="0.2561" />
            <PreSize X="0.0938" Y="0.2222" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel4" ActionTag="1909358688" Tag="931" IconVisible="False" LeftMargin="16.8000" RightMargin="1143.2000" TopMargin="301.6000" BottomMargin="258.4000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="120.0000" Y="160.0000" />
            <Children>
              <AbstractNodeData Name="player_hand_panel" ActionTag="-1727577484" Tag="490" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="131.1960" RightMargin="-211.1960" TopMargin="-19.2000" BottomMargin="29.2000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="200.0000" Y="150.0000" />
                <Children>
                  <AbstractNodeData Name="player_tile_panel" ActionTag="-362022817" Tag="491" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" RightMargin="200.0000" TopMargin="150.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="Normal" Path="PSPlayerTileNode.csd" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="131.1960" Y="29.2000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0933" Y="0.1825" />
                <PreSize X="1.6667" Y="0.9375" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="player_info_panel" ActionTag="350294312" Tag="932" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="60.0000" RightMargin="60.0000" TopMargin="80.0000" BottomMargin="80.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <AnchorPoint />
                <Position X="60.0000" Y="80.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
                <FileData Type="Normal" Path="PSPlayerInfoNode.csd" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="76.8000" Y="338.4000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.0600" Y="0.4700" />
            <PreSize X="0.0938" Y="0.2222" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel3" ActionTag="-989484370" Tag="1358" IconVisible="False" LeftMargin="157.6000" RightMargin="1002.4000" TopMargin="102.8080" BottomMargin="457.1920" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="120.0000" Y="160.0000" />
            <Children>
              <AbstractNodeData Name="player_hand_panel" ActionTag="218372974" Tag="544" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="134.4000" RightMargin="-214.4000" TopMargin="-22.0000" BottomMargin="32.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="200.0000" Y="150.0000" />
                <Children>
                  <AbstractNodeData Name="player_tile_panel" ActionTag="2103024858" Tag="545" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" RightMargin="200.0000" TopMargin="150.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="Normal" Path="PSPlayerTileNode.csd" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="134.4000" Y="32.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.1200" Y="0.2000" />
                <PreSize X="1.6667" Y="0.9375" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="player_info_panel" ActionTag="-1130665002" Tag="1359" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="60.0000" RightMargin="60.0000" TopMargin="80.0000" BottomMargin="80.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <AnchorPoint />
                <Position X="60.0000" Y="80.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
                <FileData Type="Normal" Path="PSPlayerInfoNode.csd" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="217.6000" Y="537.1920" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1700" Y="0.7461" />
            <PreSize X="0.0938" Y="0.2222" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel2" ActionTag="919181573" Tag="1373" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1002.4000" RightMargin="157.6000" TopMargin="105.6160" BottomMargin="454.3840" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="120.0000" Y="160.0000" />
            <Children>
              <AbstractNodeData Name="player_hand_panel" ActionTag="-2069229913" Tag="556" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-152.4000" RightMargin="72.4000" TopMargin="-22.0000" BottomMargin="32.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="200.0000" Y="150.0000" />
                <Children>
                  <AbstractNodeData Name="player_tile_panel" ActionTag="1905296417" Tag="557" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" RightMargin="200.0000" TopMargin="150.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="Normal" Path="PSPlayerTileNode.csd" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="-152.4000" Y="32.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-1.2700" Y="0.2000" />
                <PreSize X="1.6667" Y="0.9375" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="player_info_panel" ActionTag="154998945" Tag="1374" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="60.0000" RightMargin="60.0000" TopMargin="80.0000" BottomMargin="80.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <AnchorPoint />
                <Position X="60.0000" Y="80.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
                <FileData Type="Normal" Path="PSPlayerInfoNode.csd" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="1062.4000" Y="534.3840" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.8300" Y="0.7422" />
            <PreSize X="0.0938" Y="0.2222" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel1" ActionTag="1127040682" Tag="1388" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1143.2000" RightMargin="16.8000" TopMargin="295.6240" BottomMargin="264.3760" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="120.0000" Y="160.0000" />
            <Children>
              <AbstractNodeData Name="player_hand_panel" ActionTag="-400120645" Tag="550" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-153.6000" RightMargin="73.6000" TopMargin="-23.2000" BottomMargin="33.2000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="200.0000" Y="150.0000" />
                <Children>
                  <AbstractNodeData Name="player_tile_panel" ActionTag="1784358154" Tag="551" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" RightMargin="200.0000" TopMargin="150.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <FileData Type="Normal" Path="PSPlayerTileNode.csd" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="-153.6000" Y="33.2000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-1.2800" Y="0.2075" />
                <PreSize X="1.6667" Y="0.9375" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="player_info_panel" ActionTag="385919174" Tag="1389" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="60.0000" RightMargin="60.0000" TopMargin="80.0000" BottomMargin="80.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <AnchorPoint />
                <Position X="60.0000" Y="80.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
                <FileData Type="Normal" Path="PSPlayerInfoNode.csd" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="1203.2000" Y="344.3760" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.9400" Y="0.4783" />
            <PreSize X="0.0938" Y="0.2222" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="stack_panel" ActionTag="1684957811" Tag="569" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="370.5000" RightMargin="370.5000" TopMargin="279.3200" BottomMargin="306.6800" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="539.0000" Y="134.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="373.6800" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5190" />
            <PreSize X="0.4211" Y="0.1861" />
            <SingleColor A="255" R="77" G="77" B="77" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="operation_panel" ActionTag="-1528728686" Tag="91" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="40.0000" RightMargin="40.0000" TopMargin="640.0000" BottomMargin="20.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1200.0000" Y="60.0000" />
            <Children>
              <AbstractNodeData Name="btn_op_0" ActionTag="-2047638863" Tag="3504" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-0.5000" RightMargin="1007.5000" TopMargin="-9.5000" BottomMargin="-9.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="163" Scale9Height="57" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="193.0000" Y="79.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="96.0000" Y="30.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0800" Y="0.5000" />
                <PreSize X="0.1608" Y="1.3167" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="MarkedSubImage" Path="PSGameRoomUI/give_up_enable_btn.png" Plist="PSGameRoomUI.plist" />
                <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/give_up_btn.png" Plist="PSGameRoomUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_op_1" ActionTag="-1160113661" Tag="3505" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="201.1000" RightMargin="805.9000" TopMargin="-9.5000" BottomMargin="-9.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="163" Scale9Height="57" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="193.0000" Y="79.0000" />
                <Children>
                  <AbstractNodeData Name="img1" ActionTag="71130110" Tag="362" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="65.0000" RightMargin="65.0000" TopMargin="19.2600" BottomMargin="28.7400" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="45" Scale9Height="11" ctype="ImageViewObjectData">
                    <Size X="63.0000" Y="31.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="96.5000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5600" />
                    <PreSize X="0.3264" Y="0.3924" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/cmp_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="img2" ActionTag="1719598664" Tag="388" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="65.0000" RightMargin="65.0000" TopMargin="19.2600" BottomMargin="28.7400" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="45" Scale9Height="11" ctype="ImageViewObjectData">
                    <Size X="63.0000" Y="31.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="96.5000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5600" />
                    <PreSize X="0.3264" Y="0.3924" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/disable_cmp_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="red_img" ActionTag="-426393418" Tag="390" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="157.4900" RightMargin="-8.4900" TopMargin="-14.1000" BottomMargin="49.1000" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="26" Scale9Height="24" ctype="ImageViewObjectData">
                    <Size X="44.0000" Y="44.0000" />
                    <Children>
                      <AbstractNodeData Name="label" ActionTag="1036606046" Tag="391" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="1.5000" BottomMargin="1.5000" IsCustomSize="True" FontSize="30" LabelText="55" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="40.0000" Y="41.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="22.0000" Y="22.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="0.9091" Y="0.9318" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="179.4900" Y="71.1000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.9300" Y="0.9000" />
                    <PreSize X="0.2280" Y="0.5570" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/red_point_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="297.6000" Y="30.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2480" Y="0.5000" />
                <PreSize X="0.1608" Y="1.3167" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/bottom_btn.png" Plist="PSGameRoomUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_op_2" ActionTag="551627164" Tag="3506" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="402.7000" RightMargin="604.3000" TopMargin="-9.5000" BottomMargin="-9.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="163" Scale9Height="57" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="193.0000" Y="79.0000" />
                <Children>
                  <AbstractNodeData Name="img1" ActionTag="276242998" Tag="354" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.2000" RightMargin="100.8000" TopMargin="19.7600" BottomMargin="29.2400" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="30.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="77.2000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4000" Y="0.5600" />
                    <PreSize X="0.1554" Y="0.3797" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/add_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="img2" ActionTag="-1332441757" Tag="387" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.2000" RightMargin="100.8000" TopMargin="19.7600" BottomMargin="29.2400" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="30.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="77.2000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4000" Y="0.5600" />
                    <PreSize X="0.1554" Y="0.3797" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/disable_add_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label1" ActionTag="1038783839" Tag="355" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="99.8582" RightMargin="51.1418" TopMargin="21.9200" BottomMargin="25.0800" LabelText="22" ctype="TextBMFontObjectData">
                    <Size X="42.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="99.8582" Y="41.0800" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5174" Y="0.5200" />
                    <PreSize X="0.2176" Y="0.4051" />
                    <LabelBMFontFile_CNB Type="Normal" Path="PSGameRoomUI/jiazhu.fnt" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label2" ActionTag="-326991936" Tag="298" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="99.8582" RightMargin="51.1418" TopMargin="21.9200" BottomMargin="25.0800" LabelText="22" ctype="TextBMFontObjectData">
                    <Size X="42.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="99.8582" Y="41.0800" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5174" Y="0.5200" />
                    <PreSize X="0.2176" Y="0.4051" />
                    <LabelBMFontFile_CNB Type="Normal" Path="PSGameRoomUI/add_disable_num.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="499.2000" Y="30.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4160" Y="0.5000" />
                <PreSize X="0.1608" Y="1.3167" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/bottom_btn.png" Plist="PSGameRoomUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_op_3" ActionTag="-89271895" Tag="356" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="604.3000" RightMargin="402.7000" TopMargin="-9.5000" BottomMargin="-9.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="163" Scale9Height="57" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="193.0000" Y="79.0000" />
                <Children>
                  <AbstractNodeData Name="img1" ActionTag="-1540985478" Tag="357" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.2000" RightMargin="100.8000" TopMargin="19.7600" BottomMargin="29.2400" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="30.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="77.2000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4000" Y="0.5600" />
                    <PreSize X="0.1554" Y="0.3797" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/add_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="img2" ActionTag="-546740198" Tag="386" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.2000" RightMargin="100.8000" TopMargin="19.7600" BottomMargin="29.2400" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="30.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="77.2000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4000" Y="0.5600" />
                    <PreSize X="0.1554" Y="0.3797" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/disable_add_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label1" ActionTag="-1022994324" Tag="358" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="99.8582" RightMargin="51.1418" TopMargin="21.9200" BottomMargin="25.0800" LabelText="22" ctype="TextBMFontObjectData">
                    <Size X="42.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="99.8582" Y="41.0800" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5174" Y="0.5200" />
                    <PreSize X="0.2176" Y="0.4051" />
                    <LabelBMFontFile_CNB Type="Normal" Path="PSGameRoomUI/jiazhu.fnt" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label2" ActionTag="-931901914" Tag="299" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="99.8582" RightMargin="51.1418" TopMargin="21.9200" BottomMargin="25.0800" LabelText="22" ctype="TextBMFontObjectData">
                    <Size X="42.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="99.8582" Y="41.0800" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5174" Y="0.5200" />
                    <PreSize X="0.2176" Y="0.4051" />
                    <LabelBMFontFile_CNB Type="Normal" Path="PSGameRoomUI/add_disable_num.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="700.8000" Y="30.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5840" Y="0.5000" />
                <PreSize X="0.1608" Y="1.3167" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/bottom_btn.png" Plist="PSGameRoomUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_op_4" ActionTag="719233213" Tag="359" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="805.9000" RightMargin="201.1000" TopMargin="-9.5000" BottomMargin="-9.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="163" Scale9Height="57" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="193.0000" Y="79.0000" />
                <Children>
                  <AbstractNodeData Name="img1" ActionTag="-910451738" Tag="360" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.2000" RightMargin="100.8000" TopMargin="19.7600" BottomMargin="29.2400" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="30.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="77.2000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4000" Y="0.5600" />
                    <PreSize X="0.1554" Y="0.3797" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/add_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="img2" ActionTag="-1006930481" Tag="385" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.2000" RightMargin="100.8000" TopMargin="19.7600" BottomMargin="29.2400" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="30.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="77.2000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4000" Y="0.5600" />
                    <PreSize X="0.1554" Y="0.3797" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/disable_add_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label1" ActionTag="-135680147" Tag="361" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="99.8582" RightMargin="51.1418" TopMargin="21.9200" BottomMargin="25.0800" LabelText="22" ctype="TextBMFontObjectData">
                    <Size X="42.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="99.8582" Y="41.0800" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5174" Y="0.5200" />
                    <PreSize X="0.2176" Y="0.4051" />
                    <LabelBMFontFile_CNB Type="Normal" Path="PSGameRoomUI/jiazhu.fnt" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label2" ActionTag="-1778637720" Tag="300" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="99.8582" RightMargin="51.1418" TopMargin="21.9200" BottomMargin="25.0800" LabelText="22" ctype="TextBMFontObjectData">
                    <Size X="42.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="99.8582" Y="41.0800" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5174" Y="0.5200" />
                    <PreSize X="0.2176" Y="0.4051" />
                    <LabelBMFontFile_CNB Type="Normal" Path="PSGameRoomUI/add_disable_num.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="902.4000" Y="30.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7520" Y="0.5000" />
                <PreSize X="0.1608" Y="1.3167" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/bottom_btn.png" Plist="PSGameRoomUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_op_5" ActionTag="528403744" Tag="1493" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1007.5000" RightMargin="-0.5000" TopMargin="-9.5000" BottomMargin="-9.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="163" Scale9Height="57" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="193.0000" Y="79.0000" />
                <Children>
                  <AbstractNodeData Name="img1" ActionTag="-488493951" Tag="353" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="64.0000" RightMargin="64.0000" TopMargin="18.7600" BottomMargin="28.2400" LeftEage="21" RightEage="21" TopEage="10" BottomEage="10" Scale9OriginX="21" Scale9OriginY="10" Scale9Width="23" Scale9Height="12" ctype="ImageViewObjectData">
                    <Size X="65.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="96.5000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5600" />
                    <PreSize X="0.3368" Y="0.4051" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/follow_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="img2" ActionTag="105990607" Tag="389" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="64.0000" RightMargin="64.0000" TopMargin="18.7600" BottomMargin="28.2400" LeftEage="21" RightEage="21" TopEage="10" BottomEage="10" Scale9OriginX="21" Scale9OriginY="10" Scale9Width="23" Scale9Height="12" ctype="ImageViewObjectData">
                    <Size X="65.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="96.5000" Y="44.2400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5600" />
                    <PreSize X="0.3368" Y="0.4051" />
                    <FileData Type="MarkedSubImage" Path="PSGameRoomUI/disable_follow_img.png" Plist="PSGameRoomUI.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1104.0000" Y="30.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9200" Y="0.5000" />
                <PreSize X="0.1608" Y="1.3167" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/bottom_btn.png" Plist="PSGameRoomUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="50.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.0694" />
            <PreSize X="0.9375" Y="0.0833" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="start_btn" ActionTag="-300464701" VisibleForFrame="False" Tag="293" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="706.5000" RightMargin="322.5000" TopMargin="313.5000" BottomMargin="313.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="221" Scale9Height="71" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="251.0000" Y="93.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="832.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.6500" Y="0.5000" />
            <PreSize X="0.1961" Y="0.1292" />
            <TextColor A="255" R="65" G="65" B="70" />
            <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/start_btn.png" Plist="PSGameRoomUI.plist" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="ng_btn" ActionTag="1613924774" Tag="632" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="543.5000" RightMargin="543.5000" TopMargin="392.5000" BottomMargin="248.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="163" Scale9Height="57" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="193.0000" Y="79.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="288.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.4000" />
            <PreSize X="0.1508" Y="0.1097" />
            <TextColor A="255" R="65" G="65" B="70" />
            <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/ng_btn.png" Plist="PSGameRoomUI.plist" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="auto_btn" ActionTag="1272257781" Tag="178" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="76.0000" RightMargin="1100.0000" TopMargin="504.2080" BottomMargin="109.7920" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="74" Scale9Height="84" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="104.0000" Y="106.0000" />
            <Children>
              <AbstractNodeData Name="auto_img" ActionTag="1566433333" VisibleForFrame="False" Tag="179" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.5000" RightMargin="7.5000" TopMargin="3.5200" BottomMargin="20.4800" LeftEage="29" RightEage="29" TopEage="16" BottomEage="16" Scale9OriginX="29" Scale9OriginY="16" Scale9Width="31" Scale9Height="50" ctype="ImageViewObjectData">
                <Size X="89.0000" Y="82.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="52.0000" Y="61.4800" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5800" />
                <PreSize X="0.8558" Y="0.7736" />
                <FileData Type="MarkedSubImage" Path="PSGameRoomUI/auto_img.png" Plist="PSGameRoomUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="label" ActionTag="326574533" Tag="180" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="31.0000" RightMargin="31.0000" TopMargin="34.8800" BottomMargin="39.1200" LabelText="99" ctype="TextBMFontObjectData">
                <Size X="42.0000" Y="32.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="52.0000" Y="55.1200" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5200" />
                <PreSize X="0.4038" Y="0.3019" />
                <LabelBMFontFile_CNB Type="Normal" Path="PSGameRoomUI/jiazhu.fnt" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="bottom_label" ActionTag="1753367814" Tag="651" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-23.0000" RightMargin="-23.0000" TopMargin="90.0000" BottomMargin="-16.0000" IsCustomSize="True" FontSize="24" LabelText="自动跟注" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="150.0000" Y="32.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="52.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="0" G="201" B="126" />
                <PrePosition X="0.5000" />
                <PreSize X="1.4423" Y="0.3019" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="128.0000" Y="162.7920" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1000" Y="0.2261" />
            <PreSize X="0.0812" Y="0.1472" />
            <TextColor A="255" R="65" G="65" B="70" />
            <NormalFileData Type="MarkedSubImage" Path="PSGameRoomUI/auto_btn.png" Plist="PSGameRoomUI.plist" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="action_panel" ActionTag="24820232" Tag="1140" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="77" G="77" B="77" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>