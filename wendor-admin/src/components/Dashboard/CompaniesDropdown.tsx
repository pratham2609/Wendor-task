import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Company } from "../../types/Companies";


export default function CompaniesDropdown({ text, items, setCompany, setNewCompany }: { text: string, items: Company[], setCompany: (company: Company) => void, setNewCompany: (val: boolean) => void }) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                    className="w-full"
                >
                    {text}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Choose companies">
                <DropdownItem key={"select"}>Select</DropdownItem>
                {items.map((company: Company) => <DropdownItem key={company.id} onClick={() => setCompany(company)}>{company.company_name}</DropdownItem>)}
                <DropdownItem key={"add"} className="text-blue" onClick={() => setNewCompany(true)}>Add New</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
