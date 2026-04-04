namespace MultiCatalogBill.Api.Models;

public class CatalogItem
{
    public int Id { get; set; }
    public CatalogKind Kind { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal? DefaultUnitPrice { get; set; }
    public bool AllowsVariablePrice { get; set; }
    public bool IsCustomAmountEntry { get; set; }
    public bool Active { get; set; } = true;
    public int SortOrder { get; set; }
}
