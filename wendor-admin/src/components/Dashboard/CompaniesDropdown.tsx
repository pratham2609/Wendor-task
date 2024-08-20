import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Company } from "../../types/Companies";

export default function CompaniesDropdown({ text, items, setCompany, setNewCompany }: { text: string, items: Company[], setCompany: (company: Company) => void, setNewCompany: () => void }) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered" className="w-full">
                    {text}
                </Button>
            </DropdownTrigger>
            <DropdownMenu className="max-h-[40vh] overflow-y-auto" aria-label="Choose companies">
                <DropdownItem key={"select"}>Select</DropdownItem>
                <DropdownItem key={"add"} className="text-blue" onClick={setNewCompany}>Add New</DropdownItem>
                {items.map((company: Company) => (
                    <DropdownItem key={company.id} onClick={() => setCompany(company)}>
                        {company.company_name}
                    </DropdownItem>
                )) as any}
            </DropdownMenu>
        </Dropdown>
    );
}
