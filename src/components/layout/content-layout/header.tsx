import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {
  Layout as AntdLayout,
  Space,
  theme,
  Typography,
} from "antd";
import React from "react";
import { useGetIdentity } from "@refinedev/core";
import { IUser } from "@/interfaces";

const { Text } = Typography;
const { useToken } = theme;
export const HeaderContent: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { data: user } = useGetIdentity<IUser>();
  const { token } = useToken();

  // const { data: photo, isLoading: isLoadingPhoto } = useOne<IUserPhoto>({

  // })

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        <Space style={{marginLeft: "8px"}} size="middle">
          {user?.name && <Text strong>{user.name}</Text>}
          {/*{user?.avatar && <Avatar src={avatar} alt={user?.name}/>}*/}
          {/*<SkeletonAvatar active={true} size="small"/>*/}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
