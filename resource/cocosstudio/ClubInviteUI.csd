<GameFile>
  <PropertyGroup Name="ClubInviteUI" Type="Layer" ID="580bb830-29f2-406d-a863-4f56f09682fd" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="305" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="gps_panel" ActionTag="-562073804" Tag="14183" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="141.0000" RightMargin="141.0000" TopMargin="60.0000" BottomMargin="60.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="998.0000" Y="600.0000" />
            <Children>
              <AbstractNodeData Name="bg_img" ActionTag="1330397682" Tag="14184" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="118.0000" RightMargin="118.0000" TopMargin="-38.0000" BottomMargin="-14.0000" TouchEnable="True" Scale9Enable="True" LeftEage="118" RightEage="118" TopEage="135" BottomEage="135" Scale9OriginX="118" Scale9OriginY="135" Scale9Width="526" Scale9Height="382" ctype="ImageViewObjectData">
                <Size X="762.0000" Y="652.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="499.0000" Y="312.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5200" />
                <PreSize X="0.7635" Y="1.0867" />
                <FileData Type="Normal" Path="ClubInviteUI/club_invite_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="close_btn" ActionTag="1456870626" Tag="162" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="824.9183" RightMargin="103.0817" TopMargin="-56.6288" BottomMargin="584.6288" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="40" Scale9Height="50" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="70.0000" Y="72.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="859.9183" Y="620.6288" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8616" Y="1.0344" />
                <PreSize X="0.0701" Y="0.1200" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="Normal" Path="Default/close_btn.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="invite_scroll" ActionTag="1710508055" Tag="14297" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="159.0000" RightMargin="159.0000" TopMargin="56.0000" BottomMargin="44.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                <Size X="680.0000" Y="500.0000" />
                <Children>
                  <AbstractNodeData Name="item_panel" ActionTag="890556335" VisibleForFrame="False" Tag="14298" IconVisible="False" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" TopMargin="118.0000" BottomMargin="330.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="680.0000" Y="102.0000" />
                    <Children>
                      <AbstractNodeData Name="light_img" ActionTag="-379966174" Tag="14299" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="5.0000" RightMargin="5.0000" Scale9Enable="True" LeftEage="214" RightEage="214" TopEage="31" BottomEage="31" Scale9OriginX="214" Scale9OriginY="31" Scale9Width="516" Scale9Height="40" ctype="ImageViewObjectData">
                        <Size X="670.0000" Y="102.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="340.0000" Y="51.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="0.9853" Y="1.0000" />
                        <FileData Type="Normal" Path="CirclePopUI/light_img.png" Plist="" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="state_label" ActionTag="-2054661998" Tag="14300" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="340.2000" RightMargin="285.8000" TopMargin="36.0000" BottomMargin="36.0000" FontSize="26" LabelText="空闲" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="54.0000" Y="30.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="367.2000" Y="51.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="0" G="144" B="255" />
                        <PrePosition X="0.5400" Y="0.5000" />
                        <PreSize X="0.0794" Y="0.2941" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="wait_btn" ActionTag="152162129" Tag="14301" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="487.3000" RightMargin="31.7000" TopMargin="19.5000" BottomMargin="19.5000" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="131" Scale9Height="42" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="161.0000" Y="63.0000" />
                        <Children>
                          <AbstractNodeData Name="time_label" ActionTag="1292737508" Tag="14305" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="20.5000" RightMargin="20.5000" TopMargin="15.5000" BottomMargin="15.5000" LabelText="12:00" ctype="TextBMFontObjectData">
                            <Size X="120.0000" Y="32.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="80.5000" Y="31.5000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.7453" Y="0.5079" />
                            <LabelBMFontFile_CNB Type="Normal" Path="ClubInviteUI/shuz.fnt" Plist="" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="567.8000" Y="51.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.8350" Y="0.5000" />
                        <PreSize X="0.2368" Y="0.6176" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <NormalFileData Type="Normal" Path="ClubInviteUI/wait_btn.png" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="invite_btn" ActionTag="1472833373" Tag="14306" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="487.3000" RightMargin="31.7000" TopMargin="19.5000" BottomMargin="19.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="131" Scale9Height="41" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="161.0000" Y="63.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="567.8000" Y="51.0000" />
                        <Scale ScaleX="1.1000" ScaleY="1.1000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.8350" Y="0.5000" />
                        <PreSize X="0.2368" Y="0.6176" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <NormalFileData Type="Normal" Path="CirclePopUI/apply_btn_normal.png" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="head_img_frame" ActionTag="-191809441" Tag="14302" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="11.9000" RightMargin="583.1000" TopMargin="8.5000" BottomMargin="8.5000" LeftEage="19" RightEage="19" TopEage="15" BottomEage="15" Scale9OriginX="19" Scale9OriginY="15" Scale9Width="47" Scale9Height="55" ctype="ImageViewObjectData">
                        <Size X="85.0000" Y="85.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="54.4000" Y="51.0000" />
                        <Scale ScaleX="0.9000" ScaleY="0.9000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0800" Y="0.5000" />
                        <PreSize X="0.1250" Y="0.8333" />
                        <FileData Type="Normal" Path="CirclePopUI/frame_img.png" Plist="" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="name_label" ActionTag="1624416195" Tag="14303" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="103.5400" RightMargin="405.4600" TopMargin="37.5000" BottomMargin="37.5000" IsCustomSize="True" FontSize="25" LabelText="快乐大本营天天" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="171.0000" Y="27.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="189.0400" Y="51.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="139" G="105" B="20" />
                        <PrePosition X="0.2780" Y="0.5000" />
                        <PreSize X="0.2515" Y="0.2647" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position Y="330.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition Y="0.6000" />
                    <PreSize X="1.0000" Y="0.1855" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="499.0000" Y="294.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.4900" />
                <PreSize X="0.6814" Y="0.8333" />
                <SingleColor A="255" R="255" G="150" B="100" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="680" Height="550" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.7797" Y="0.8333" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>