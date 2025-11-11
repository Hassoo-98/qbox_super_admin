import { useState } from "react";
import { Dropdown, Button, Flex } from "antd"
import { DownOutlined } from '@ant-design/icons';
const LanguageDropdown = () => {
    const [selected, setSelected] = useState({
        key: "1",
        label: 'English',
        flag: "https://flagcdn.com/w20/us.png",
    });
     const items = [
    {
      key: "1",
      label: (
        <span
          onClick={() =>
            setSelected({
              key: "1",
              label: 'English',
              flag: "https://flagcdn.com/w20/us.png",
            })
          }
        >
          <Flex gap={5}>
            <img
              src="https://flagcdn.com/w20/us.png"
              alt="English"
              style={{ width: 25, marginRight: 8 }}
            />
            English
          </Flex>
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          onClick={() =>
            setSelected({
              key: "2",
              label: 'Arabic',
              flag: "https://flagcdn.com/w20/sa.png",
            })
          }
        >
          <Flex gap={5}>
            <img
              src="https://flagcdn.com/w20/sa.png"
              alt="Arabic"
              style={{ width: 25, marginRight: 8 }}
            />
            Arabic
          </Flex>
        </span>
      ),
    },
  ];
    return (
        <div>
            <Dropdown menu={{ items }} trigger={['click']}>
                <Button className="btn">
                    <img src={selected.flag} alt={selected.label} style={{ width: 20 }} />
                    <span>{selected.label}</span>
                    <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    )
}

export { LanguageDropdown }
