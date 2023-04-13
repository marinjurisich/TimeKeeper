
## Quick commands

```bash

# Verify that the service is running
systemctl status mssql-server --no-pager

# Connect to client
sqlcmd -S localhost -U sa -P '<YourPassword>'

```


## Quick install ([Source](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16)):

``` bash

# 1. Import the public repository GPG keys:
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc

# 2. Register the SQL Server Ubuntu repository:
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2022.list)"

# 3. Run the following commands to install SQL Server:
sudo apt-get update && sudo apt-get install -y mssql-server

# 4. After the package installation finishes, run `mssql-conf setup` and follow the prompts to set the SA password and choose your edition. As a reminder, the following SQL Server editions are freely licensed: Evaluation, Developer, and Express.
sudo /opt/mssql/bin/mssql-conf setup
# For the password, you need a minimum length 8 characters, at least 1 uppercase and lowercase letters, digit and/or non-alphanumeric symbol.

# 5. Once the configuration is done, verify that the service is running:
systemctl status mssql-server --no-pager


#  Install the SQL Server command-line tools

#Use the following steps to install the `mssql-tools` on Ubuntu. If *curl* isn't installed, you can run this code:
sudo apt-get update && sudo apt install curl

# 1. Import the public repository GPG keys:
curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc

# 2. Register the Ubuntu repository:
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list

# 3. Update the sources list and run the installation command with the `unixODBC` developer package.
sudo apt-get update && sudo apt-get install mssql-tools unixodbc-dev

# You can update to the latest version of mssql-tools using the following commands:
sudo apt-get update && sudo apt-get install mssql-tools

# 4. Add `sqlcmd` and `bcp` to PATH to make it available in terminal by default.
    # Add the following code to your `~/.bashrc` file with any GUI / CLI text editor:
export PATH="$PATH:/opt/mssql-tools/bin"

# 5. Connect locally
sqlcmd -S localhost -U sa -P '<YourPassword>'
    # Where:
    # `-S` is SQL Server name
    # `-U` is username
    # `-P` is password
```

Note: If you can connect to the SQL client in the terminal, but not through the app, consider adding username and password fields to the connection string.

<hr />

If successful, you should get to a `sqlcmd` command prompt: `1>`

Example usage:

```bash
1>  CREATE DATABASE TimeKeeper
2>  GO
```
It is mandatory to write `GO` for the commands before it to execute.
It seems that writing commands in `sqlcmd` resembles writing a transaction.


## Rename SQL Server

Enter the SQL CLI:
```bash
sqlcmd -S localhost -U sa -P '<YourPassword>'
```

Follow these instructions.
```bash
  # Find out current server name
1> SELECT @@SERVERNAME
2> GO

  # Drop current server (replace <SERVER_NAME> with output of previous command)
3> sp_dropserver <SERVER_NAME>
4> GO

  # Create new server
5> sp_addserver NEW_SERVER_NAME, local
```

Lastly, restart SQL Server service:
```bash
systemctl restart mssql-server
```
